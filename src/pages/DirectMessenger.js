import React from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {styled} from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  
  p {
    position: absolute;
    top: 10vh;
    left: 20px;
  }
  
  .first {
    position: absolute;
    top: 15vh;
    left: 20px;
  }
  .second {
    position: absolute;
    top: 15vh;
    left: 100px;
  }
  
`

const DirectMessenger = () => {
  const endPoint = "http://localhost:8111/ws";
  const stompClient = Stomp.over(new SockJS(endPoint));
  const header = {
    userId : "testId"
  };

  stompClient.connect(header, function (frame) {
    console.log("connected: " + frame);
  });



  function Send() {
    let chat = {
      roomId: 1,
      sender: "user01",
      message: "test messaage",
      MessageType: "ENTER"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chat));
  }

  function Subscribe() {
    stompClient.subscribe("/notification/message", function (response) {
      const data = JSON.parse(response.body);
      console.log("아오 웹소켓시치");
      console.log(data);
    });
  }

  return (
    <Container>
      <p>웹 소켓 테스트입니다.</p>
      <button className="first" onClick={Subscribe}>subscribe</button>
      <button className="second" onClick={Send}>send</button>
    </Container>
  );
}

export default DirectMessenger;