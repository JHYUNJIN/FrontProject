import styled from '@emotion/styled';
import {useState} from "react";

// -------------------------------------------------------------------------

const AWrap = styled.div`
border: 3px solid red;
`;

const A=()=>{
  const [msg,setMsg] = useState('메세지');
  
  const tmp = (e) => {
    // change 이벤트가 발생하면 실행되는 함수
    console.log('change이벤트가 발생되었습니다.');
    // let myInput = document.querySelector('input')
    // setMsg(myInput);
    //msg라는 매개변수에는 무엇이 들어있을까 ?
    console.log(e); //SyntheticBaseEvent 타입의 객체가 들어가네!
    //msg.target에는 이벤트가 발생한 태그가 들어있음 (input 태그)
    //입력한 값은 input태그.value에 들어있음
    console.log(e.target.value);
    setMsg(e.target.value);
  }
  
  //엔터키가 입력된다면 실행시킬 함수
  const enterPressed=(e)=>{
    console.log('onKetDown이벤트가 발생되었습니다.');
    //엔터가 눌렸을 때
    console.log(e);
    // setMsg('메세지');
    // e.keyCode 엔터는 keyCode값이 13이다.
    //매개변수 e에서 엔터의 keyCode값은 13이다.
    if(e.keyCode===13){
      setMsg('enter가 눌러졌습니다.');
    }
    //매개변수 e에서 Esc의 keyCode값은 27이다.
    else if(e.keyCode===27){
      console.log('Esc가 눌러졌습니다.');
      e.target.blur();
    }
  }
  
  return(
    <>
      <AWrap>
        <h1>A컴포넌트 영역입니다.</h1>
        <input onChange={tmp} onKeyDown={enterPressed}/>
        <p>{msg}</p>
      </AWrap>
    </>
  );
}

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

const StatePage=()=>{
  //변수
  let [number,setNumber] =useState(0);
  
  
  //함수
  const normalClick=()=>{
    console.log("기본버튼이 클릭되었습니다.");
  }
  
  const plusClick=()=>{
    console.log("클릭 전 number",number);
    // number++;
    setNumber(number+1);
    console.log("클릭 후 number",number);
  }
  const minusClick=()=>{
    console.log("클릭 전 number",number);
    // number--;
    setNumber(number-1);
    console.log("클릭 후 number",number);
  }
  const resetClick=()=>{
    setNumber(0);
  }


  return(
    <>
      <h1>스테이트 컴포넌트</h1>
      <h2>{number}</h2>
      <button onClick={normalClick}>기본버튼입니다.</button>
      <br/>
      <button onClick={minusClick}>-</button>
      <button onClick={plusClick}>+</button>
      <button onClick={resetClick}>reset</button>
      <A/>
    </>
  );
}




export default StatePage;