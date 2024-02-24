//에러페이지로 사용할 컴포넌트

import { useRouteError } from "react-router-dom";

const ErrorPage=()=>{
  // 함수 실행 결과는 객체이다.
  // 오류에 대한 다양한 정보들이 들어있는 객체
  // statusText 혹은 message 등등의 key값이 있는 객체

  let err = useRouteError();


  return (
    <div>
      <h1>페이지 오류!</h1>
      <p>해당 페이지를 찾을 수 없습니다.</p>
    </div>
  );
}





export default ErrorPage;