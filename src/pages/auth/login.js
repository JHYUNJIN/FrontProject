import { Link, useNavigate } from "react-router-dom";
import { AuthBody, AuthBox, AuthFooter, AuthForm, BgImg, Button, CancelIcon, ErrMsg, Input, InputBoxWrap, Line, LogoImg, Wrap } from "../../styles/auth/auth.styles";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";

const LoginPage = ()=>{
  // 유효성 검사
  // 이메일 입력시 비어있으면안됨, 이메일형식(@포함)
  // 비밀번호입력시 비어있으면 안됨, 6자리 이상()
  // submit 할때도 이메일, 비밀번호 잘 입력되었는지 확인
  
  const [email, setEmail ] = useState('');
  const [password , setPassword ] = useState('');

  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  const navigate = useNavigate();


  // App.js에 있는 accessToken 변수와 setAccessToken 함수 사용하기
  const {setAccessToken} = useContext(UserContext);


  //이메일이 입력될 때 마다 받아 올 함수
  const onEmailChange = (e)=>{
    
    const emailText = e.target.value;
    setEmail(emailText);
    
    if(emailText === ''){
      setEmailErrMsg('이메일을 입력해주세요.');
    }else if(!emailText.includes('@')){
      setEmailErrMsg('"@"를 포함한 이메일 형식으로 입력해주세요.');
    }else{
      setEmailErrMsg('');
    }
  }

  const onPasswordChange = (e)=>{
    const passwordText = e.target.value;
    setPassword(passwordText);

    if(passwordText === ''){
      setPasswordErrMsg('비밀번호를 입력해주세요.');
    }else if(passwordText.length < 6){
      setPasswordErrMsg('비밀번호는 6글자 이상 입력해주세요');
    }else{
      setPasswordErrMsg('');
    }
  }

  //로그인하기를 눌렀을 때 실행 될 함수
  const onLoginSubmit = async (e)=>{
    e.preventDefault();
    // <a> 태그등을 클릭했을 때,
    // 기본적으로 해당 링크로 이동하게 됩니다. 
    // 그러나 JavaScript에서 preventDefault()를 사용하여 
    // 기본적으로 설정 된 동작을 막았기 때문에
    // 링크로 바로 이동하지 않고
    // 경고창이 발생되게 합니다.
    

    let check = true;

    if(email === ''){
      setEmailErrMsg('이메일은 필수 입력 값입니다.');
      check = false;
    }else if(!email.includes('@')){
      setEmailErrMsg('이메일 형식을 지켜주세요');
      check = false;
    }else{
      setEmailErrMsg('');
    }
    
    if(password === ''){
      setPasswordErrMsg('비밀번호는 필수 입력 값입니다.');
      check = false;
    }else if(password.length < 6){
      setPasswordErrMsg('최소 6글자 이상으로 작성해주세요');
      check = false;
    }else{
      setPasswordErrMsg('');
    }

    if(check){
      // 로그인한 회원 조회
      try{
        let res = await axios.post('/api/login', {email, password});
        // console.log(res.dataccesToken);
        alert(res.data.accessToken);
        // 로컬스토리지에 저장
        localStorage.setItem('accessToken', res.data.accessToken);
        // 나는 localStorage에 저장하겠다.
        // 페이지가 바껴도 저장하고 있다.
        // 세션이나 쿠키에 저장하면 해킹에 취약하다.
        // 쿠키는 여러가지 설정이 가능하여 해킹을 막을 수 있는 여러가지 방법들이 존재한다.
        setAccessToken(res.data.accessToken);
        //전역state변수(App.js에있는 accessToken)에 저장

        navigate('/', {replace:false});
        // navigate 사용 시 '/' 메인페이지로 되돌아가게 한다.
        // replace:true 선언하면 로그인 성공 시 
        // 뒤로가기를 못하게 만든다.
      }catch(err){
        console.log(err);
        if(err.response.status === 404){
          alert('아이디 또는 비밀번호를 확인해주세요.');
        }
      }
    }
  }

  return(
    <BgImg>
      <Wrap>
        <CancelIcon><CloseIcon/></CancelIcon>
        <AuthBox>
          <LogoImg src="/logo.svg" alt="logo"/>
          <AuthBody>
            <AuthForm onSubmit={onLoginSubmit}>
              <InputBoxWrap>
                <div className="input-box">
                  <Input onChange={onEmailChange} type="text" placeholder="아이디" />
                  <ErrMsg>{emailErrMsg}</ErrMsg>
                </div>
                <div className="input-box">
                  <Input onChange={onPasswordChange} type="password" placeholder="비밀번호" />
                  <ErrMsg >{passwordErrMsg}</ErrMsg>
                </div>
              </InputBoxWrap>
              <Button>로그인 하기</Button>
            </AuthForm>
            <Line className="line"></Line>
            <AuthFooter>
              <Link to="">이메일 찾기</Link>
              <Line className="line"></Line>
              <Link to="">비밀번호 찾기</Link>
              <Line className="line"></Line>
              <Link to="/join">회원가입 하기</Link>
            </AuthFooter>
          </AuthBody>
        </AuthBox>
      </Wrap>
    </BgImg>

  );
}

export default LoginPage;