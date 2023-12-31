import {useEffect, useState} from "react";
import diaryApi from "../../api/DiaryApi";
import moment from "moment/moment";
import {BsSend} from "react-icons/bs";
import {CommentBox, CommentDetail} from "../../styled/SwiperComponent";

export const Comment = (props) => {
  const [text, setText] = useState("");

  const onChangeComment = (e) => {
    setText(e.target.value);
  }
  const commentSend = async () => {
    const request = {
      diary: props.diary,
      comment: text
    }

    await diaryApi.sendComment(request);
    await diaryApi.sendcommentNoti(request);
    await setText("");
    await props.setCount(props.count + 1);
    console.log(request);
  }

  const BlockBubbling = (e) => {
    e.stopPropagation();
  }
  // 시간 포맷팅 하는 함수
  const timeData = (timeString) => {
    moment.locale('ko');
    return moment(timeString).format('YYYY년 MM월 DD일 A h시 mm분');
  };


  const deleteComment = async (e) => {
    await diaryApi.deleteComment(e.id);
    window.location.replace("/diary/detail/" + props.diary);
  }

  const [array, setArray] = useState(null);

  useEffect(() => {
    setArray(props.commentList.filter(e => e.customer !== null))
    console.log(props.commentList)
  }, [props]);


  return (
    <CommentBox onClick={(event) => BlockBubbling(event)}>

      {/* 유저 댓글 작성 칸*/}
      <div className="input">
        <div className="profile">
          <img src={props.customer.profilePic}/>
        </div>
        <input type="text" id="comment" value={text} onChange={onChangeComment}/>
        <button className="btn-send">
          <BsSend className="send" onClick={() => commentSend()}/>
        </button>
      </div>

      <hr/>
      {/* 구분선 */}

      <p className="caption">댓글 {array != null ? array.length : 0}</p>

      {/* 댓글 목록 */}
      <div className="content">
        {/* 댓글 낱개 디자인 */}
        {array && array.map(e => (
          !e.delete && <CommentDetail key={e.id}>
            <div className="profile">
              {/*<img src={`${process.env.PUBLIC_URL}/public_assets/default_avatar.png`}/>*/}
              <img src={e.customer.profilePic}/>
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