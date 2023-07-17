import React, { useEffect } from "react";
import { styled } from 'styled-components';
import { BiArrowBack, BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlinePlus , AiFillDelete} from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import MyFlowContainer from "../components/MyFlowContainer"
import { useState } from "react";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { SlPicture } from "react-icons/sl"
import { AiOutlineClose } from 'react-icons/ai';
import FlowModal from "../utils/FlowModal";
import Modal from '../utils/Modal';
import { BsPencilSquare } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import "../components/Flowcss.css"
import { storage } from "../api/FirebaseApi";
import MyFlowDetailModal from "../utils/MyFlowDetailModal";
import MyFlowApi from "../api/MyFlowApi";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import useCurrentLocation from "../utils/Location";
import { Map } from "react-kakao-maps-sdk";
import { SlLocationPin } from "react-icons/sl";
import LocationModal from "../utils/LocationModal";


const MyFlowDiv = styled.div`
	background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
  border: ${props=>props.theme.borderColor};	
	width: 390px;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	flex-direction: column;
	position: relative;

	 .controlDiv{
	  	position: absolute;
		top : 2px
	  }
		.flowArea {
        background-color:transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        outline: none;
        width: 95%;
        height:80%;
        resize: none;
        border: none;
				border-bottom: 1px solid #999999;
        border-top: 1px solid #999999;
        font-family: var(--kfont);
        color: ${props=>props.theme.textColor};

			@media(max-width: 768px) {
    		width: 95%;
    		height: 80%;
  		}
		}
`;


const FileBox = styled.div`  
	float: left;

	.fileSelect {
		width: auto;
		height: 50px;
		border: 1px solid black;
	}
	.thumbnail {
		margin-left: 10px;
    width: 15%;
    height: 15%;
    object-fit: cover;
	}
	.filebox {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.filebox .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
	}
	.filebox label {
    display: inline-block;
    color: #fff;
    cursor: pointer;
    height: 30px;
		width: 30px;
    margin-left: 10px;
		font-family: var(--kfont);
		font-size: 12px;
	}
	.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
	}
`;

const BiArrowBacks = styled(BiArrowBack)`
	position: absolute;
 	left: -165px;
	width: 35px;
	height: 35px;
	top: 10px;
	color: var(--grey);
	cursor: pointer;
	&:hover{
		color: var(--blue);
	}
`;

const MyFlowMenuName = styled.p`
	display: flex;
	justify-content: space-between;
	font-family: var(--efont);
	width: 100%;
	font-size: 30px;
	font-weight: bolder;
	margin-top: -25%;
	.title {
		font-size: 35px;
		margin-left: 10%;
	}
`;



const CreateBtn = styled.div`
    border-radius: 8px;
		border: 1px solid #d9d9d9;
    width: 35px;
    height: 35px;
    color: white;
    margin-right: 10%;
		align-self: flex-end;
    &:hover{
        background-color: white;
        border: 1px solid silver;
    }
    ${(props) => props.isClicked && 
        `background-color: black; `
    }
`

const FlowDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start; 
	align-items: center;
	margin-top: 30px;
	width: 100%;
	height: 60vh;
	gap: 5px; 
	overflow-y: scroll; 
	
	
`;

const ScrollBar = styled.div`
	width: 100%;
	height: 60vh;
	margin-top: -20px;
	::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
		
	}

	::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #d9d9d9; /* 스크롤바의 색상 */
    border-radius: 10px;
		transition: 0.2s ease;
	}

	::-webkit-scrollbar-thumb:hover {
    background-color: grey;
  }
	padding-right: 5px;
`;

const MenuBar = styled.div`
	
	width: 82%;
	height: 30px;
	border-radius: 8px;
	background-color: ${props => props.theme.textColor === 'black' ? '#d6d6d6' : '#423F3E'};
	position: relative;
`;

// Sort

const SortButton = styled.button`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 290px;
	top: 0px;
	border: none;
	background-color: transparent;
	&:hover {
		cursor: pointer;
	}
`;

const SortAz = styled(CgSortAz)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: -1px;
	top: -1.5px;
`;

const SortZa = styled(CgSortZa)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: -1px;
	top: -1.5px;
`;


// Search
const SearchImg = styled(AiOutlineSearch)`
	position: absolute;
	width: 25px;
	height: 25px;
	top: 2px;
	left: 138px;
	border: none;
	color: ${props=>props.theme.divColor};
`;

const SearchBarInput = styled.input`
	position: absolute;
	top: 2px;
	left: 2px;
	width: 160px;
	height: 75%;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	background-color: ${props => props.theme.borderColor === '1px solid #424242' ? '#d9d9d9' : 'white'};
	outline: none;
	
`;

const DiaryImgSet = styled(BsPencilSquare)`
	width: 20px;
	height: 20px;
`;

const DiaryButton = styled.button`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 210px;
	top: 0px;
	border: none;
	background-color: transparent;
	transition: 0.6s ease;
	&:hover {
		cursor: pointer;
	}
`;

const SelectAllButton = styled.button`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 183px;
	top: 0px;
	border: none;
	background-color: transparent;
	transition: 0.6s ease;
	&:hover {
		cursor: pointer;
	}	
`;

const SelectImg = styled(BiSelectMultiple)`
	width: 20px;
	height: 20px;	
`;

// Check

const CheckButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: absolute;
	width: 30px;
	left: 265px;
	top: 0px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	&:hover {
		cursor: pointer;
	}
`;

const CheckImg = styled(BsCheckCircle)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 20px;
	height: 20px;
	left: 3px;
	top: 4px;	
`;

const PictureImg = styled(SlPicture)`
	width: 30px;
	height: 30px;
	color: ${props=>props.theme.textColor};
`;

const CloseButton = styled(AiOutlineClose)`
	position: absolute;
	top: 10px;
	right: -160px;
  width: 35px;
  height: 35px;
	color: ${props=>props.theme.divColor};
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;

const DeleteImg = styled(AiFillDelete)`
	width: 30px;
	height: 25px;
	margin-bottom: 2px;
	margin-left: 1px;
`;

const DeleteButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: absolute;
	width: 30px;
	left: 230px;
	height: 30px;
	top: 0px;
	border: none;
	background-color: transparent;
	transition: 0.6s ease;
	&:hover {
		cursor: pointer;
	}
`;

const MenuButtonWrapper = styled.div`

`;


const MyFlow = ({ onClose, goToMyPage }) =>{

	// context에서 유저 데이터 받아오기
	const context = useContext(UserContext);
	const {email, nickname} = context;

	const [data, setData] = useState(); // 가져온 JSON 플로우 데이터를 저장
	const [sortedFlow, setSortedFlow] = useState(data); // 플로우 데이터 정렬

	 // 마운트 되었을 때 JSON 데이터를 가져오는 비동기 함수
	useEffect(() => {
		const token = localStorage.getItem('authToken');
		console.log(token);
		console.log("useEffect 실행");
    const fetchData = async () => {
        const response = await MyFlowApi.getmyFlow(token);
				console.log("데이터 받음");
        setData(response.data);
				setSortedFlow(response.data);
				console.log(response);
				console.log(response.data);
    };
			fetchData(); // fetchData 함수 호출
  	}, []);

		// 들어온 플로우 데이터값을 정렬
	const handleSort = () => { 
    setSort((prevSort) => (prevSort === "az" ? "za" : "az"));
		if (sort === "az") {
			const sorted = [...data].sort((a, b) => a.id - b.id);
			setSortedFlow(sorted);
		} else {
			const sorted = [...data].sort((a, b) => b.id - a.id);
			setSortedFlow(sorted);
		}
  };

	// 플로우 검색 기능 구현
	const handleSearch = (searchQuery) => {
			const filteredFlow = data.filter(
				(item) =>
					(item.content && item.content.includes(searchQuery)) ||
					(item.location && item.location.includes(searchQuery))
			);
			setSortedFlow(filteredFlow);
		};
	

	const handleSearchChange = (e) => {
		const { value } = e.target;
		setSearchValue(value);
		if (value === "") {
			setSortedFlow(data);
		} else {
			handleSearch(value);
		}
  };


	const [sort, setSort] = useState("az"); // 정렬 아이콘 상태 
	const [searchValue, setSearchValue] = useState(""); // 검색창 인풋창 밸류
	

	// 글쓰기 모달 & 알림 모달
	const [flowModalOpen, setFlowModalOpen] = useState(false);
	const [flowModalText, setFlowModalText] = useState("");
	const [place, setPlace] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalText, setModalText] = useState(
		<>
			작성된 내용은 저장되지 않습니다. <br />
			정말 닫으시겠습니까?
		</>
	);

	// 유저 위치 찾기
	const [locationModalOpen, setLocationModalOpen] = useState(false);
	const { location, error, getCurrentLocation } = useCurrentLocation();
	const [locationValue, setLocationValue] = useState("");
	const [state, setState] = useState({
		// 지도의 초기 위치
		center: { lat: location?.latitude, lng: location?.longitude },
		// 지도 위치 변경시 panto를 이용할지에 대해서 정의
		isPanto: false,
	  })
		
	const handleLocationModal = () => {
		setLocationModalOpen(!locationModalOpen);
	}

	const locationConfirm = () => {
		setLocationValue(place);
		setLocationModalOpen(false);
	}



	const openFlowModal = () => {
		setFlowModalOpen(true);
	}

	const closeFlowModal = () => {
		setModalOpen(true);
	}

	const closeModal = () => {
		setModalOpen(false);
	}

	const closeBoth = () => {
		setModalOpen(false); 
		setFlowModalOpen(false);
		setThumbnailSrc("");
		setFlowModalText("");
		setPlace("");
	}

	  // 플로우 작성시 이미지 파일 선택하는 핸들링

		const [file, setFile] = useState(null);
  	const [url, setUrl] = useState('');
	
		const handleUpload = () => {
			// 파일이 있는지 확인
			if (file) {
				// 이미지 파이어베이스 업로드
				const storageRef = storage.ref();
				const fileRef = storageRef.child(file.name);
		
				fileRef.put(file).then(() => {
					console.log('File uploaded successfully!');
					fileRef.getDownloadURL().then((url) => {
						console.log("저장경로 확인 : " + url);
						setUrl(url);
						continueToDB();
					});
				});
			} else {
				console.log('파일이 없습니다.');
				continueToDB();
			}
		};

		// 글 DB에 올리는 부분 구현
		const continueToDB = () => {
			MyFlowApi.newFlow(email, location.latitude, location.longitude, flowModalText, url, place, function() {
				const response = MyFlowApi.getmyFlow(email);
				const jsonData = response.data;
				setData(jsonData);
			});
		
			setFlowModalOpen(false);
		};

	// 플로우 작성 시 이미지 추가 및 추가시 썸네일

  const [thumbnailSrc, setThumbnailSrc] = useState("");
  
	const handleFileInputChange = (e) => {
	  const file = e.target.files[0];
		setFile(e.target.files[0]);
	  if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
  
		reader.onload = (e) => {
		  setThumbnailSrc(e.target.result);
		};
  
		reader.readAsDataURL(file);
	  } else {
		setThumbnailSrc("");
	  }
	};

	
	
	const [isVisible, setIsVisible] = useState(false);
	const handleCheck = () => {
		setIsVisible(!isVisible);

	}
  
	// 컨테이너를 클릭했을 때 모달창에 상세정보를 띄워주도록
	// 플로우디테일모달에 들어갈 데이터를 세팅하는
	const [responseDate, setResponseDate] = useState("");
	const [responseTime, setResponseTime] = useState("");
	const [responseLocation, setResponseLoaction] = useState("");
	const [responseContent, setResponseContent] = useState("");
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

	const [clicked, setClicked] = useState("");

	const handleContainerClick = async (event, id) => {
		setIsDetailModalOpen(true);
		const clickedId = id;
		setClicked(clickedId);
		const response = await MyFlowApi.getClickedFlow(clickedId);
		setResponseDate(response.data.date);
		setResponseTime(response.data.time);
		setResponseLoaction(response.data.location);
		setResponseContent(response.data.content);
		
	};

	const handleDetailClose = () => {
		setClicked("");
		setResponseDate("");
		setResponseTime("");
		setResponseLoaction("");
		setResponseContent("");
		setIsDetailModalOpen(false);
	}

	const containers = document.getElementsByClassName("myFlowContainer");

// 각 컨테이너에 클릭 이벤트 리스너를 추가합니다.
	for (const container of containers) {
  	container.addEventListener('click', handleContainerClick);
	}




    return(
			<MyFlowDiv>
				     <div className="controlDiv">
						 <BiArrowBacks onClick={goToMyPage}/>
        				<CloseButton onClick={onClose}/>
      				</div>
				<MyFlowMenuName>
					<p className="title">
						my<span style={{ color: '#00B4D8' }}>F</span>low
					</p>
					<CreateBtn onClick={openFlowModal}>
					<AiOutlinePlus style={{ color: 'grey' }}></AiOutlinePlus>
				</CreateBtn>
				</MyFlowMenuName>
				
				<MenuBar>
				<SearchBarInput type="text" className="nicknameInput" value={searchValue} onChange={handleSearchChange}  />
					<MenuButtonWrapper>
						<SearchImg />
						<div>
							<CSSTransition in={isVisible} timeout={200} classNames="fade" unmountOnExit>
								<div>
									<DiaryButton>
										<DiaryImgSet />
									</DiaryButton>
									<DeleteButton>
										<DeleteImg />
									</DeleteButton>
								</div>
							</CSSTransition>
						</div>
						<CheckButton onClick={handleCheck}>
							<CheckImg />
						</CheckButton>
						<SortButton onClick={handleSort}>
							{sort === "az" ? <SortAz /> : <SortZa />}
						</SortButton>
					</MenuButtonWrapper>	
				</MenuBar>
				<ScrollBar >
          <FlowDiv>
            {sortedFlow && sortedFlow.map((sortedFlow) => (
              <MyFlowContainer
								className="myFlowContainer"
                key={sortedFlow.id}
                img={sortedFlow.img}
                time={new Date(sortedFlow.date).toLocaleTimeString([], { timeStyle: 'medium' })}
                content={sortedFlow.content}
                location={sortedFlow.location}
								date={new Date(sortedFlow.date).toLocaleDateString([], {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								})}
								isVisible={isVisible}
								onClick={(e) => handleContainerClick(e, sortedFlow.id)}
              />
            ))}
          </FlowDiv>
        </ScrollBar>
				<LocationModal 
					open={locationModalOpen}
					close={handleLocationModal}
					type="y"
					confirm={locationConfirm}
				 	header="Flow">
			
					<div className="placeDiv" style={{
							position:"absolute",
							top:"45px",
							left:"30px",
							zIndex:"9999999"
									}}>
						<label for="location" className="locationPin"><SlLocationPin /></label>
						<input type="text" value={place} onChange={(e) => setPlace(e.target.value)} id="location" placeholder="장소를 입력해주세요" 
						style={{
							backgroundColor: "transparent",
        			outline: "none",
        			color: `${props=>props.theme.textColor}`,
        			border: "none"
						}}
						/>
					</div>
					{/* <Map className="map" // 지도를 표시할 Container 
									center={state.center}
									isPanto={state.isPanto}
									style={{
									// 지도의 크기
									width: "90%",
									height: "75%",
									position:"absolute",
        					alignSelf: "center",
        					justifyContent: "center",
									
									}}
									level={3} // 지도의 확대 레벨
								>
									<div
									style={{
										display: "flex",
										gap: "10px",
									}}
									>
									<button className="locationButton" style={{
										
										width: "35px",
										height: "35px",
										alignItems: "center",
										justifyContent: "center",
										border: "none",
										borderRadius: "100px",
										backgroundColor: "#d9d9d9",
										position:"absolute",
										right:"40px",
										bottom:"70px",
										zIndex:"9999"
									}}
									onClick={() => { 
										getCurrentLocation();
										setState(
											{
												center: { lat: location.latitude, lng: location.longitude },
												isPanto: true,
											},
										);
									}}
									
									>
										<BiCurrentLocation style={{
											position:"absolute",
											top:"0",
											left:"0",
											color: "black",
											width: "35px",
											height: "35px",
											alignSelf: "center",
											justifyContent: "center",
											border: "none",
											backgroundColor: "transparent"
									}} />
									</button>
									</div>
								</Map> */}
								    <>
    </>
		
		</LocationModal>
		<FlowModal
        open={flowModalOpen}
        close={closeFlowModal}
        header="Flow"
        type="y"
				confirm={handleUpload}
      	>
        <textarea className="flowArea" placeholder="나의 플로우를 공유해 보세요"
          value={flowModalText}
          onChange={(e) => setFlowModalText(e.target.value)}
        />
				<div className="wrapper">
					<FileBox className="filebox">
						<div className="filebox">
								<label for="file"><PictureImg /></label> 
								<input type="file" onChange={handleFileInputChange} className="fileSelect" id="file"/>
								{thumbnailSrc !== "" && (
										<img id="thumbnail" src={thumbnailSrc} alt="" className="thumbnail" />
								)}	
						</div>
					</FileBox>
					<div className="locationDiv">
						<label for="locationBtn" className="locationPin"><SlLocationPin /></label>
						<input type="text" value={locationValue} readOnly onClick={handleLocationModal} placeholder="위치 설정하기" className="locationInputBtn" id="locationBtn" />
					</div>
				</div>
    </FlowModal>
		
		<Modal open={modalOpen} close={closeModal} header="SpotFlow" type={"type"} confirm={closeBoth}>{modalText}</Modal>
		<MyFlowDetailModal open={isDetailModalOpen} close={handleDetailClose} ></MyFlowDetailModal>
	</MyFlowDiv>
    );
};

export default MyFlow;