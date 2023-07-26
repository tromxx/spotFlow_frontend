import { styled } from 'styled-components';
import Logo from '../../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../../images/DarkLogo.png"
import { useTheme } from "../../context/themeProvider";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";
import { BiExit } from 'react-icons/bi'
import { useState } from 'react';
import { VscBellDot, VscBell } from 'react-icons/vsc'
import { useEffect } from 'react';
import axios from 'axios';
import CustomerApi from '../../api/CustomerApi';
import NotificationApi from '../../api/NotificationApi';

import CustomerApi from '../../api/CustomerApi'
import { useEffect } from 'react';

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
  position: absolute;
  z-index: 5;
`;

const LoggedOutDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 3vw;
  gap: 15px;
  cursor: pointer;
  p:nth-child(odd):hover{
    color: var(--lightblue);
  }
`

const LogoImg = styled.img`
  width: 20vh;
  min-width: 150px;
  cursor: pointer;
  padding-left: 35px;
`;

const LoggedInDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 65px;
  gap: 15px;

`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 30px;
  &:hover{
    color: var(--lightblue);
  }
`;

const NofiOn = styled(VscBellDot)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  &:hover{
    color: var(--lightblue);
  }
`;

const NofiNone = styled(VscBell)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  &:hover{
    color: var(--lightblue);
  }
`;


const HeaderBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  const [oldNofi, setOldNofi] = useState("");
  const [isNewNofi, setIsNewNofi] = useState(false);
  const [nofiData, setNofiData] = useState("");
  const{setEmail,  email, nickname,setNickname,setProfilePic,setStatMsg,setFollower, setFollowing ,isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  
    useEffect(() => {
    const token = localStorage.getItem('authToken');
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.customer.email);
          setNickname(response.data.customer.nickName);
          setProfilePic(response.data.customer.profilePic);
          setStatMsg(response.data.customer.statMsg);
          setFollower(response.data.follower.follower);
          setFollowing(response.data.follower.following);
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      }else{
        return null;
      }
    };
    getCustomerInfo();
  }, [isLoggedIn,setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn,setFollower, setFollowing]);
  
  useEffect(() => {
    if(isLoggedIn) {
      const token = localStorage.getItem("authToken");

    const fetchNoti = async () => {
      const response = await NotificationApi.getAllNoti(token);
      if(response.data !== oldNofi) {
        setIsNewNofi(true);
        setOldNofi(response.data);
      } else {
        console.log("새로운 알림이 없습니다.");
      }
    }

    fetchNoti();

    }
    
  }, []);

  const logOut = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const notificationFunc = () => {
    navigate("/nofication");
    setIsNewNofi(false);
  }

  return (
    <HeaderBarDiv>
      <LogoImg
        src={ThemeMode === 'dark' ? DarkLogo : Logo}
        onClick={()=>navigate("/")}
      />
      {isLoggedIn ? 
        <LoggedInDiv>
          <button className="nofi" onClick={()=>{navigate("/nofication")}}>
              {isNewNofi !== "" ? <NofiOn /> : <NofiNone />}
          </button>
          <p>{nickname}</p>
          <Exit onClick={logOut}/>
        </LoggedInDiv>
        :
        <LoggedOutDiv>
          <p onClick={()=>navigate("/login")}>Login</p>
          <p>|</p>
          <p onClick={()=>navigate("/signup")}>Sign up</p>
        </LoggedOutDiv>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;