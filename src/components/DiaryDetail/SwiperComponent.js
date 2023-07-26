import {styled} from "styled-components";
import {Swiper, SwiperSlide} from "swiper/react";
import {BsChatDots, BsSend} from "react-icons/bs";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import moment from 'moment';
import 'moment/locale/ko';
import diaryApi from "../../api/DiaryApi";
import UserStore, {UserContext} from "../../context/UserStore";

export const DiarySwipe = styled(Swiper)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0);
  display: flex;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const TimeLine = styled(SwiperSlide)`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1000px;
    max-height: 700px;
    @media (max-width: 768px) {
      max-width: 390px;
      max-height: 840px;
    }
  }

  p {
    font-size: .8rem;
  }
`;
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* background-color: gray; */
  position: relative;
  background-color: black;
  justify-content: center;

  * {
    box-sizing: border-box;
  }
`;
export const Btn = styled.button`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: 3px solid #d9d9d9;
  background-color: #61dafb;
  z-index: 3;

  .comment {
    font-size: 30px;
    color: white;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    bottom: 20px;
    right: 10px;
    border: 2px solid #d9d9d9;
  }
`;
export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  top: 7vh;
  right: 0;
  background-color: rgb(0, 0, 0, 30%);
  position: absolute;
  z-index: 2;
  color: white;
  padding: 50px;
  font-size: 20px;
`
export const DiaryBox = styled.div`
  width: 100%;
  height: 50%;
`
export const TimeLineBox = styled.div`
  width: 100%;
  height: 50%;
`
const CommentBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 500px;
  background-color: white;
  z-index: 3;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 3px 7px 30px 7px rgb(20, 20, 20, 30%);

  * {
    box-sizing: border-box;
  }

  .input {
    width: 100%;
    height: 50px;
    //background-color: rgb(20, 20, 20, 30%);
    border-radius: 5px;
    position: relative;
    display: flex;
    @media (max-width: 768px) {
      height: 37px;
    }
  }

  hr {
    opacity: 30%;
  }

  img {
    max-width: 45px;
    @media (max-width: 390px) {
      max-width: 37px;
    }
  }

  .profile {
    background-color: #61dafb;
    border-radius: 45px;
    width: 45px;
    height: 45px;
    margin-top: 2px;
    margin-left: 5px;
    @media (max-width: 768px) {
      width: 37px;
      height: 37px;
      border-radius: 37px;
    }
  }

  #comment {
    background-color: #eee;
    height: 40px;
    width: 380px;
    margin: 5px 20px;
    border: 0;
    border-radius: 30px;
    padding-left: 15px;
    padding-right: 45px;
    @media (max-width: 768px) {
      height: 27px;
      width: 260px;
      margin: 4px 6px;
      padding-right: 35px;
    }
  }

  .caption {
    color: grey;
    font-size: .8rem;
    margin-top: 25px;
    margin-left: 5px;
  }

  .btn-send {
    position: absolute;
    right: 22px;
    top: 7px;
    height: 36px;
    width: 36px;
    border-radius: 36px;
    border: 0;
    background-color: #caf0f8;
    @media (max-width: 768px) {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      top: 6px;
      right: 8px;
    }
  }

  .send {
    font-size: 20px;
    margin-top: 5px;
    color: #00b4d8;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .content {
    width: 100%;
    height: 80%;
    background-color: #d9d9d9;
    overflow: auto;
    border: .2px solid rgb(120, 120, 120);
    @media (max-width: 768px) {
      height: 405px;
    }
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 530px;
    padding: 10px;
    border-radius: 10px;
  }
`
const CommentDetail = styled.div`
  width: 100%;
  padding: 5px;
  background-color: white;
  border: .2px solid rgb(20, 20, 20, 30%);
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .comment-info {
    display: flex;
    flex-direction: column;
    width: 395px;
    max-width: 100%;
    margin-left: 5px;
    font-size: .8rem;
  }

  .subtitle {
    display: flex;
    font-size: .8rem;
  }

  .time {
    font-size: .4rem;
    color: rgb(0, 0, 0, 30%);
    margin-right: 15px;
  }

  .comment {
    width: 390px;
    white-space: normal;
    font-size: .6rem;
    @media (max-width: 768px) {
      width: 220px;
    }
  }

  .delete {
    margin-left: auto;
    font-size: .5rem;
    cursor: pointer;
  }

  .delete .update:hover {
    color: #00b4d8;
  }
`;
export const Comment = (props) => {
  const [text, setText] = useState("");
  const [token, setToken] = useState("");

  const onChangeComment = (e) => {
    setText(e.target.value);
  }
  const Send = async () => {
    const request = {
      diary: props.diary,
      comment: text,
      email: "user3@example.com"
    }
    await diaryApi.sendComment(request);
    await setText("");
    await props.setCount(props.count + 1);
  }

  const BlockBubbling = (e) => {
    e.stopPropagation();
  }
  // 시간 포맷팅 하는 함수
  const timeData = (timeString) => {
    moment.locale('ko');
    return moment(timeString).format('YYYY년 MM월 DD일 A h시 mm분');
  };


  function deleteComment(e) {
    diaryApi.deleteComment(e.id);
    window.location.replace("/diary/detail/" + props.diary);
  }

  // => 댓글 수정하는 법인데 할게 너무 많아서 일단 킵
  //
  // const [upComm, setUpComm] = useState(0);
  //
  // function updateComment() {
  //   if (upComm === 0) setUpComm(1);
  //   else setUpComm(0);
  // }
  //
  // const [updateText, setUpText] = useState("");
  // function onChangeUpText (e) {
  //   setUpText(e.target.value);
  // }
  // function done(e) {
  //   const comment = {
  //     comment: e.id,
  //     content: updateText
  //   }
  //   diaryApi.updateComment(comment);
  //   setUpComm(0);
  // }

  const [array, setArray] = useState(null);

  useEffect(() => {
    // setToken(localStorage.getItem('authToken'));
    // console.log(token);
    setArray(props.commentList)
    console.log(props.commentList)
    // console.log("upComm" + upComm)
  }, [props.count, token]);


  return (
    <CommentBox onClick={(event) => BlockBubbling(event)}>

      {/* 유저 댓글 작성 칸*/}
      <div className="input">
        <div className="profile">
          <img src={`${process.env.PUBLIC_URL}/public_assets/default_avatar.png`}/>
        </div>
        <input type="text" id="comment" value={text} onChange={onChangeComment}/>
        <button className="btn-send">
          <BsSend className="send" onClick={() => Send()}/>
        </button>
      </div>

      <hr/>
      {/* 구분선 */}

      <p className="caption">댓글 {array != null ? array.length : 0}</p>

      {/* 댓글 목록 */}
      <div className="content">
        {/* 댓글 낱개 디자인 */}
        {array && array.map(e => (
          !e.delete && <CommentDetail>
          <div className="profile">
            <img src={`${process.env.PUBLIC_URL}/public_assets/default_avatar.png`}/>
          </div>
          <div className="comment-info">
            <div className="subtitle">
              <span className="name">{e.customer.nickName}</span>
              <div className="delete">
                <span className="time">{timeData(e.joinDate)}</span>

                {/*{upComm === 0 ?*/}
                {/*  <>*/}
                    {/*<span className="update" onClick={updateComment}>수정</span>*/}
                    {/*/*/}
                    <span className="update" onClick={()=>deleteComment(e)}>삭제</span>
                {/*  </>*/}
                {/*  :*/}
                {/*  <span className="update" onClick={()=>done(e)}>완료</span>*/}
                {/*}*/}
              </div>
            </div>
            {/*{upComm === 0 ?*/}
              <>
                <span className="comment">
                {e.content}
                </span>
              </>
            {/*  :*/}
            {/*  <>*/}
            {/*    <textarea value={updateText} onChange={onChangeUpText}></textarea>*/}
            {/*  </>*/}
            {/*}*/}
          </div>

        </CommentDetail>))}
      </div>

    </CommentBox>)
};

export const Thumbs = styled.button`
  position: absolute;
  bottom: 130px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: rgb(0, 0, 0, 0);
  border: 0;
  z-index: 3;

  .thumbs-up {
    font-size: 40px;
    color: white;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    bottom: 70px;
    right: 10px;
  }
`