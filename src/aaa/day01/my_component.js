import { Link } from "react-router-dom";

//나만의 컴포넌트를 만들어보자
function a(){
  return "정현진";
}


function Jin(){
  // 이곳을 주석

  return (
    <>
      {/* 이곳을 주석 */}
      <h1>{a()} 컴포넌트</h1>
      <p className={a()}>내가 처음으로 만든 나만의 xml, 즉 리액트 컴포넌트입니다.</p>
      <p>{a()}</p>
      <Link to='/aaa'>주소 뒤에 aaa 붙여줘!</Link>
    </>
    );
}



export default Jin;