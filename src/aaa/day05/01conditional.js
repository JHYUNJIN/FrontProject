// 조건부 렌더링

import styled from "@emotion/styled";

const ConditionalPage=()=>{
  return(
    <>
      <h1 abc='금요일' id="킹스맨" className="err">조건부 렌더링</h1>
      <MyDiv abc='1번' id='정현진' className="err">div1입니다.</MyDiv>
      <MyDiv abc='2번' id='정현진' className="err">div2입니다.</MyDiv>
    </>
  );
}


const MyDiv=styled.div`
  border: 3px solid black;
  width: 200px;
  text-align: center;
  ${a=>a.abc === '1번' ? 'background-color:red' : 'background-color:blue'
      // if(a.abc==='1번'){return 'background-color:red';}
      // else {return 'background=color:blue';}
  }
`;



export default ConditionalPage;