/* 타임라인 정보를 핸들링하는 api */
import axios from "axios";

const DOMAIN = "http://localhost:8111"

const userTimelineApi = {
  // 모든 타임라인 정보를 가져옴
  getUserTimelineList: async () => {
    return await axios.get(DOMAIN + "/timeline/list");
  },
  // 특정 유저의 타임라인 정보를 가져옴
  getUserTimeline: async (email) => {
    return await axios.get(DOMAIN + "/timeline/user/" + email);
  },
  // 특정 타임라인 정보를 가져옴
  getTimeline: async (timeline) => {
    return await axios.get(DOMAIN + "/timeline/" + timeline.index);
  },
  // 타임라인 정보를 저장함
  setUserTimeline: async (props) => {
    const data = {
      email : props.email,
      lat : props.lat,
      lng : props.lng,
      image : props.image,
      title : props.title,
      content : props.content,
      time : props.time,
      category : props.category,
    }
    return await axios.post(DOMAIN + "/timeline/" + props.email, data);
  },
  // 타임라인 정보를 수정함
  reWrite: async (timeline) => {
    return await axios.put(DOMAIN + "/timeline/" + timeline.index, timeline);
  },
  // 조회수를 올려줌
  upView: async (index) => {
    return await axios.put(DOMAIN + "/timeline/view/" + index);
  },

}

export default userTimelineApi;