/*
Following Page
- 사용자가 어떻한 사용자를 following 하고 있는지 확인 가능
- 맞 follow 기능 있음 
*/

import React, {useState} from "react";
import {styled} from 'styled-components';
import KakaoMap from "../components/KakaoMap";
import { AiOutlineMenu } from 'react-icons/ai';
import SearchBar from "../components/SearchBar";
import FollowingFollowCounter from "../components/FollowingFollowCounter";
import UserContainer from "../components/FollowerContainer";
const FollowingDiv = styled.div`
    width: 30vw;
    height: 100vw;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-top: 60px;
`;

const Following = () => {
  const [search, setSearch] = useState("");

  const handleUserInput = (input) => {
    setSearch(input);
    console.log(input);
  };

  return (
    <FollowingDiv>
        <FollowingFollowCounter follower={10} following={20} />
        <SearchBar onInputChange={handleUserInput}/>
        <p>This if Following page</p>
        <p>{search}</p>
    </FollowingDiv>
  );
};

export default Following;