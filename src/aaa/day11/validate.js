import { useState } from "react";

const ValidateTest = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [pwErrMsg, setPwErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
 
  const onJoin = (e)=>{
    e.preventDefault();
    console.log(email);
    console.log(password);
    if(email === ''){
      setEmailErrMsg('이메일을 필수로 입력해주세요');
    }else if( !email.includes('@')){
      setEmailErrMsg('이메일 형식을 지켜주세요');
    }else{
      setEmailErrMsg('');
    }

    if(password === ''){
      setPwErrMsg('비밀번호를 필수적으로 입력해주세요');
    }else if(password.length < 6){
      console.log('비밀번호가 6글자 미만입니다')
      setPwErrMsg('비밀번호는 6글자 이상을 써주세요');
    }else{
      setPwErrMsg('');
    }
  }

  const onEmailChage = (e)=>{
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  const onPwChange = (e)=>{
    setPassword(e.target.value);
  }

  return(
    <>
      <h1>유효성검사</h1>
      <form>
        <input onChange={onEmailChage} id="email" name="email" type="text" placeholder="아이디를 입력하시오" />
        <p>{emailErrMsg}</p>
        <input onChange={onPwChange} id="password" name="password" type="password" placeholder="비밀번호를 입력하시오"/>
        <p>{pwErrMsg}</p>
        <button onClick={onJoin}>회원가입하기!</button>
      </form>
    </>
  );
}

export default ValidateTest;