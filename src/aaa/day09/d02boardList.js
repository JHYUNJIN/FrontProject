import axios from "axios";
import { useEffect, useState } from "react";

const BoardListAxios=()=>{

  const [boardList,setBoardList] = useState([]);

  useEffect(()=>{
    axios.get('https://koreanjson.com/posts')
    .then((res)=>{setBoardList(res.data)})
  },[]);


  return(
    <>
      <h1>axios를 통해 get 요청하기</h1>
      {boardList.map((e)=>
        <div>
          <h1>제목 : {e.title}</h1>
          <p>작성일 : {e.createdAt}</p>
        </div>
        )
      }
    </>
  );
}

export default BoardListAxios;