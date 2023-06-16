import React from "react";
import { styled } from 'styled-components';
import Logo from '../images/logo.png';

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--grey);

  p {
    font-family: var(--efont);
    font-size: 2vh;
    padding-right: 3vw;
  }

  img {
    padding-left: 3%;
    width: 15vh;
    height: 5vh;
  }
`;

const HeaderBar = () => {
    return (
        <HeaderBarDiv>
            <img src={Logo} alt="not working" />
            <p>Login / Signup</p>
        </HeaderBarDiv>
    );
};

export default HeaderBar;
