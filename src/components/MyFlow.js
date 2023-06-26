import React from "react";
import { styled } from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlinePlus ,AiOutlineEdit , AiFillDelete} from "react-icons/ai";
import MyFlowContainer from "./MyFlowContainer"
import FlowData from "../dataSet/FlowData";
import { useState, useEffect, useRef } from "react";
import { CgSortAz, CgSortZa, CgCheckO, CgRadioCheck } from "react-icons/cg";

const MyFlowDiv = styled.div`
  	display: flex;
  	justify-content: center;
  	align-items: center;
		text-align: center;
		flex-direction: column;
		position: relative;
`;

const BiArrowBacks = styled(BiArrowBack)`
 	margin-left: 30px;
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
	width: 80%;
	font-size: 30px;
	font-weight: bolder;
	margin-top: -15%;
	align-self: flex-start; // 왼쪽 정렬을 위해 align-self 속성을 추가합니다.
  margin-left: 10%; // 원하는 왼쪽 여백을 설정합니다.

	.title {
		font-size: 35px;
	}
`;



const CreateBtn = styled.div`
    
    border-radius: 8px;
		border: 1px solid #d9d9d9;
    width: 35px;
    height: 35px;
    color: white;
    margin : 5px;
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
	gap: 10px; 
	overflow-y: scroll; 
	padding-right: 5px;
	
`;

const ScrollBar = styled.div`
	width: 80%;
	height: 60vh;
	
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
	display: flex;
	justify-content: space-between;
	width: 80%;
	height: 30px;
	border-radius: 8px;
	background-color: #d9d9d9;
`;

const SortButton = styled.button`
	position: relative;
	width: 30px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	

	&:hover {
		cursor: pointer;
	}
`;

const SearchButton = styled.button`
	position: relative;
	width: 30px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	&:hover {
		cursor: pointer;
	}
`;

const SearchImg = styled(AiOutlineSearch)`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 0px;
	top: 0px;
`;

const SortAz = styled(CgSortAz)`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 0px;
	top: 0px;
`;

const SortZa = styled(CgSortZa)`
	position: absolute;
	width: 30px;
	height: 30px;
	left: 0px;
	top: 0px;
`;

const CheckButton = styled.button`
	position: relative;
	width: 30px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	&:hover {
		cursor: pointer;
	}
`;

const CheckImg = styled(CgCheckO)`
	position: absolute;
	width: 25px;
	height: 25px;
	left: 2px;
	top: 2px;	
`;

const DateDiv = styled.div`
	width: 100px;
	height: 20px;
`;

const MenuButtonWrapper = styled.div`
	align-self: flex-end;
`;
const MyFlow = ({ handleMain }) =>{

	const [flow, setFlow] = useState(FlowData); // 플로우 더미데이터
	const [sort, setSort] = useState("az"); // 정렬 아이콘 상태 
	const [isSerchBarVisible, setIsSerchBarVisible] = useState(false); // 검색바 보이게 or 안보이게

	const flowRef = useRef(null); // 요소를 선택하기 위한 ref
  const [topElementId, setTopElementId] = useState(null);


	const handleSort = () => {
    setSort((prevSort) => (prevSort === "az" ? "za" : "az"));
  };

	const handleSearchBar = () => {
		setIsSerchBarVisible(!isSerchBarVisible);
		
	}

	useEffect(() => {
    const handleScroll = () => {
      // scroll 이벤트 핸들러 내에서 요소의 정보를 가져옵니다.
      if (flowRef.current) {
        const topElementId = flowRef.current.firstChild?.getAttribute('id');
        setTopElementId(topElementId);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [flowRef.current]); // flowRef.current를 의존성 배열에 포함시킴
	



    return(
		<>
			<h1 onClick={handleMain}><BiArrowBacks/></h1>
			<MyFlowDiv>
				<MyFlowMenuName>
					<p className="title">myFlow</p>
					<CreateBtn>
					<AiOutlinePlus style={{ color: 'grey' }}></AiOutlinePlus>
				</CreateBtn>
				</MyFlowMenuName>
				
				<MenuBar>
            <DateDiv>{topElementId}</DateDiv>
					
					<MenuButtonWrapper>
						<CheckButton>
							<CheckImg />
						</CheckButton>

						<SearchButton>
							<SearchImg />
						</SearchButton>

						<SortButton onClick={handleSort}>
							{sort === "az" ? <SortAz /> : <SortZa />}
						</SortButton>
					</MenuButtonWrapper>	
				</MenuBar>
				<ScrollBar >
          <FlowDiv ref={flowRef}>
            {flow.map((item) => (
              <MyFlowContainer
								className="myFlowContainer"
                key={item.id}
                id={item.id}
                img={item.src}
                time={item.time}
                content={item.content}
                location={item.location}
              />
            ))}
          </FlowDiv>
        </ScrollBar>
			</MyFlowDiv>
		</>
    );
};

export default MyFlow;