import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";



const MapPage = () => {

  let [fetchPostList,setFetchPostList] = useState([]);
  let [axiosPostList,setAxiosPostList] = useState([]);

  let ar = [10,20,30];
  let result = ar.map(()=>{return 5});
  let res = ar.map((element,index,array)=>{
    console.log('element : ',element);
    console.log('index : ',index);
    console.log('array : ',array);
    return element*3;
  });
  
  console.log('ar : ',ar);
  console.log('result : ',result);
  console.log('res : ',res);

  let ar2 = [<h2 key={1}>제목1</h2>,<h2 key={2}>제목2</h2>,<p key={3}>안녕하세요</p>]

  let todoList1 = [
    'javascript 공부',
    'css 복습',
    'html 공부',
    'team project 준비',
    '쇼핑하기',
    '청소하기',
    '독서하기'
  ];

  // let todoList2 = todoList1.map((element,index)=>{return <div ket={index}>{element}</div>;})

  let postList = [
    {
      id : 5,
      title : '백과사전',
      writer : 'test@naver.com',
      createdAt : '2023-08-30',
      updatedAt : '2023-08-30'
    },
    {
      id : 78,
      title : '네이버란 ?',
      writer : 'abc@naver.com',
      createdAt : '2023-08-30',
      updatedAt : '2023-08-30'
    },
    {
      id : 465,
      title : '카카오란 ?',
      writer : 'donamu@naver.com',
      createdAt : '2023-08-30',
      updatedAt : '2023-08-30'
    }
  ];


  // fetch('https://koreanjson.com/posts').then((response)=>{
  //   console.log('결과가져옴');    
  //   console.log(response);
  //   return response.json()
  // }).then((data)=>{
  //   console.log('data : ',data);
  //   // fetchPostList = data;
  //   setFetchPostList(res.data);
  // }).catch((err)=>{
  //   //오류 발생 시 실행되는 catch함수
  //   console.log(err);
  // });

  // axios.get('https://koreanjson.com/posts')
  // .then((res)=>{
  //   console.log('res : ',res);
  //   console.log('res.data : ',res.data);
  //   // axiosPostList = res.data;
  //   setAxiosPostList(res.data);
  // }).catch((err)=>{
  //   console.log(err);
  // })

  return(
    <>
      <h1>fetch로 가져온 배열</h1>
      {fetchPostList[0]?.id}
      <h1>axios로 가져온 배열</h1>
      {axiosPostList[0]?.id}
      <h1>To Do List</h1>
      {todoList1.map((element,index)=><div key={index}>{element}</div>)}
      {res}
      {ar2}
      {/* {todoList2} */}
      <div>javascript 공부</div>
      <div>css 복습</div>
      <div>html 공부</div>
      <div>team project 준비</div>
      <div>쇼핑하기</div>
      <div>청소하기</div>
      <div>독서하기</div>
      <h1>글 목록</h1>
      <WriteWrap>
        <WriteRow>
          <p>No</p>
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
          <p>수정일</p>
        </WriteRow>
        { postList.map((e,index)=>(
          <WriteRow key={e.id}>
            <p>{index+1}</p>
            <p>{e.title}</p>
            <p>{e.writer}</p>
            <p>{e.createdAt}</p>
            <p>{e.updatedAt}</p>
          </WriteRow>
        ))}
      </WriteWrap>
    </>
  )
}

const WriteWrap = styled.div`
  background-color: skyblue;
  border-radius: 20px;
  box-shadow: 3px 4px 12px rgba(0,0,0,0.08);
  width: 80%;
  margin: 0 auto;
  padding: 10px 20px;
`

const WriteRow = styled.div`
  display: flex;

  & p{
    text-align: center;
    flex-grow: 1;
  }
  /* & p:nth-of-type(1){ */
    /* width: 10%; */
  /* } */
`

export default MapPage;