import { useEffect, useState } from "react";

const BoardListFetch=()=>{
  const[boardList,setBoardList] = useState([]);

  // 서버로부터 배열을 가져와서 boardList에 대입, 최초 한번만 실행되어야함
  useEffect(()=>{
    fetch('https://koreanjson.com/posts')
    .then((response)=>{return response.json()})
    .then((data)=>{setBoardList(data)})
  },[])

  return(
    <>
      <h1>게시글 목록을 보는 화면</h1>
      {
        boardList.map((e)=>{return <div>{e.title}</div>})
      }
    </>
  )
}



export default BoardListFetch;