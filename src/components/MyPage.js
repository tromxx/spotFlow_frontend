import React, { useRef } from 'react';
import {styled} from 'styled-components';
import {useTheme} from "../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react';
import {RxGear} from 'react-icons/rx'

//SideDiv CSS 컴포넌트로 고정 값으로 사용할 예저 고민중
const MyInfoDiv = styled.div`
  width: 390px;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  border-right: 1px solid var(--grey);
  background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
  border: ${props=>props.theme.borderColor};
  margin-top: 7vh;
  font-family: var(--efont);
  transition: 0.6s ease;
  .controlDiv{
    margin-top: 10px;
    display: flex;
    gap: 290px;
  }
  img{
    border-radius: 50%;
    width: 130px;
    height: 130px;
    margin-top: 15px;
    z-index: 5;
    float: left;
  }
  .caption{
    position: absolute;
    margin-top: 15px;
    width: 129px;
    height: 129px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    display: ${({ isBorderVisible }) => (isBorderVisible ? 'block' : 'none')};
  }
  .profileDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .statusMsg{
      border: ${props =>
      props.isBorderVisible
      ? '1px solid #d9d9d9' : '1px solid #d9d9d9'};
      transition: 0.6s ease;
      border-radius: 8px;
      background-color: transparent;
      box-sizing: border-box;
    }
    textarea{
      color: ${props => props.theme.textColor};
      resize: none;
      font-family: var(--kfont);
      width: 250px;
      height: 50px;
      margin: 0px;
      padding: 0px;
      background-color: transparent;
      border: none;
      resize: none;
      outline: none;
      padding: 2px;
    }
  }
  .profileDiv p:nth-child(3){
    font-weight: bold;
    font-size: 25px;
    height: 10px;
  }
  .followingfollowerDiv{
    display: flex;
    gap: 50px;
  }
  .modifyInputDiv{
    position: absolute;
    top: 100px;
    left: 100px;
  }
`;

const Paragrph = styled.p`
transform: ${({ isActive }) => `translateX(${isActive ? 0 : -500}%)`};
  &:hover{
    cursor: pointer;
  }
  &.NickName{
    transition: transform 1.8s ease;
  }
  &.Following{
    transition: transform 2.8s ease;
  }
  &.Statusmsg{
    transition: transform 2.8s ease;
  }
`
const Menu = styled.h1`
  transform: ${({ isActive }) => `translateX(${isActive ? 0 : -200}%)`};
  &:hover {
    cursor: pointer;
    color : var(--lightblue);
  }
  &.MyFlow {
    transition: transform 1.8s ease;
  }
  &.Diary {
    transition: transform 2.0s ease;
  } 
  &.Theme {
    transition: transform 2.2s ease;
  }
`

// 톱니버튼 CSS
const ControlButton = styled(RxGear)`
  width: 30px;
  height: 30px;
  transition: transform 0.7s ease;
  transform: ${({isActive}) => (isActive ? 'rotate(120deg)' : 'rotate(5deg)')};
  &:hover{
    color: skyblue;
  }
`;

//close 버튼 CSS
const CloseButton = styled(AiOutlineClose)`
  width: 35px;
  height: 35px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;

const MyPage = ({ onClose, goToMyFlow }) => {
  const [ThemeMode, setTheme] = useTheme(); // black white 변경
  const [active, setIsActive] = useState(true);
  const [isBorderVisible, setIsBorderVisible] = useState(false); // 정보 수정 톱니바퀴를 눌렀을 때 닉네임 input의 border 보이게 할 것인지
  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(!active);
    setIsBorderVisible(!isBorderVisible);
  };

  console.log(isBorderVisible);

  return (
    <MyInfoDiv>
      <div className="controlDiv">
        <ControlButton onClick={handleClick} isClicked={active} />
        <CloseButton onClick={onClose} />
      </div>
      <div className='profileDiv'>
        <img src="https://img.freepik.com/premium-psd/cute-dog-3d-illustration_541652-270.jpg" alt="error" />
        <div className='caption' isBorderVisible={isBorderVisible}>
          <input type="file" />
        </div>
        <Paragrph isActive={active} className='NickName'>Trom</Paragrph>
        <div className='followingfollowerDiv'>
          <Paragrph isActive={active} className='Following'>Following : 100</Paragrph>
          <Paragrph isActive={active} className='Following'>Follower : 200</Paragrph>
        </div>
        <div className='statusMsg' isBorderVisible={isBorderVisible}>
          <textarea 
            cols="20" 
            rows="2" 
            spellcheck="false"
            readOnly={active}>
            </textarea>
        </div>
      </div>
      <div className='routeDiv'>
        <Menu onClick={goToMyFlow} isActive={active} className='MyFlow'>my<span style={{color : "skyblue"}}>F</span>low</Menu>
        <Menu onClick={()=>navigate("/diary")} isActive={active} className='Diary'>Diary</Menu>
        <Menu isActive={active} onClick={setTheme} mode={ThemeMode} className='Theme' >{ThemeMode === "dark" ? "Light Mode" : "Dark Mode"}</Menu>
      </div>
    </MyInfoDiv>
  );
};

export default MyPage;
