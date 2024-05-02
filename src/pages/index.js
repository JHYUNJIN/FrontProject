import { useContext } from "react";
import { useMove } from "../hooks/hooks";
// import { Test } from "../App";

const IndexPage = ()=>{
  // const {age, name} = useContext(Test);
  // console.log(value);
  let moveToLoginPage = useMove('/login');
  let moveToJoinPage = useMove('/join');
  let moveToCareerPage = useMove('/career');

  return(
    <>
      {/* {age} */}
      {/* {name} */}
      <h1>메인페이지 입니다</h1>
      <button onClick={moveToLoginPage}>로그인하기</button>
      <button onClick={moveToJoinPage}>회원가입하기</button>
      <button onClick={moveToCareerPage}>커리어</button>
    </>
  )
}

export default IndexPage;