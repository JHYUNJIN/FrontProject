import styled from "@emotion/styled";

// 없는 경로를 썼을 때 보여줄 화면
const ErrorPage = ()=>{
  return(
    <Wrap>
      <h1>죄송합니다! 페이지를 찾을 수 없습니다</h1>
      <p>버튼을 클릭하시면 메인페이지로 이동합니다</p>
      <button>메인으로 이동하기</button>
    </Wrap>
  );
}

export default ErrorPage;

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  justify-content: center;
`;