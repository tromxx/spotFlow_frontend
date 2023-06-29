import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
	
    .modal {
        display: none; // 평소에는 숨겨진 상태로 시작
        position: fixed; // 스크롤을 했을 경우에도 동일한 위치에 있도록
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        animation: modal-bg-show 0.8s; // 팝업이 열릴 때 스르륵 열리는 효과
    }

  .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
    width: 60px;
    height: 40px;
    margin: 5px;
  }
  .modal > section {
    width: 90%;
    height: 50%;
    text-align: center;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: ${props=>props.theme.divColor};
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  .modal > section > header {
    position: relative;
    text-align: left;
    padding: 16px 64px 16px 16px;
    background-color: ${props=>props.theme.divColor};
    font-weight: 700;
    color: ${props=>props.theme.textColor};
  }
  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: ${props=>props.theme.textColor};
    background-color: transparent;
  }
  .modal > section > main {
    padding: 0 16px;
		height: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    
  }
  .modal > section > footer {
    padding: 0px 16px;
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: white;
    background-color:#424242;
		border: 1px solid #424242;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 90%;
	height: 80%;
	border-radius: 8px;
	background-color: ${props=>props.theme.bgColor};
	font-family: var(--kfont);
`;

const ModalTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 90%;
	height: 10%;
	border-radius: 8px;
	background-color: ${props=>props.theme.bgColor};
	outline: none;
	border: none;
	margin-bottom: 10px;
`;


const FlowModal = (props) => {
    const { open, confirm, close, type, header, children } = props;

    return(
       <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
            {open && 
            <section>
                <header>
                    {header}
                    <button onClick={close}>
                        &times;
                    </button>
										
                </header>
                <main>
									
									<ModalContent>
										{children}
									</ModalContent>
								</main>
                <footer>
                    {type && <button onClick={confirm}>확인</button>}
                    <button onClick={close}>닫기</button>
                </footer>
            </section>
            }

        </div>
       </ModalStyle>
    );

}

export default FlowModal;