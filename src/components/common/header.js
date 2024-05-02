import { useContext, useEffect, useState } from "react";
import { UserText } from "../../styles/common/aside.styles";
import { Header } from "../../styles/common/header.styles";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Popover } from "@mui/material";

const DashboardHeader = (props)=>{
  // DashboardLayout에서 만든 state변수와 setState함수를 자식인
  // DashboardHeader에서 받아옴
  const {isOpen, setIsOpen} = props;
  
  const navigate = useNavigate();
  // 전역state변수에 있는 토큰 값 가져오기
  const {accessToken, setAccessToken} = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = useState( { 
    email:'로그인 후 이용해주세요.',
    created_date:'',
    updated_date:''
  } );
  // const [loggedInEmail , setLoggedInEmail] = useState('로그인 후 이용해주세요');

  // popOver 창의 기준 element 요소
  const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  // 불린값이 null이면 false
  // 값이 있으면 true로 해석 함
  // 그러므로 open은 true를 의미함

  // 헤더가 그려지면 db가서 로그인 한 사람 정보 가져오기
  useEffect(()=>{
    //useEffect에는 async 함수를 사용하지 말라네요..

    let tmp = async ()=>{
      if(accessToken === null) return;
      try{
        let res = await axios.get('/api/loggedInEmail', 
          {headers : {Authorization : `Bearer ${accessToken}`}}
          // 관례적으로 문자열 Bearer띄어쓰기를 붙여서 토큰을 전달해준다.
          // 보안을 위해 ?..  Bearer말고 다른 단어를 써도 되는데
          // 프론트와 백엔드가 약속한 문자를 추가해서 주고받으면 된다.
        );

        // res.data에 로그인한 계정의 이메일 주소가 들어있음
        let res2 = await axios.get(`/api/users/${res.data}`);
        console.log(res2.data);
        setLoggedInUser(res2.data);


      }
      catch(err){
        // 로그인 시간이 만료되거나 로그인을 안한 경우
        console.log(err);
        alert('로그인을 먼저 해주셔야 이용할 수 있습니다.');
        //navigate('/login', {replace : true});
      }
    }

    tmp();
    // axios.get('/api/users/로그인한사람id');
  }, [ navigate, accessToken ]);

  const onLogout = ()=>{
    // 로그아웃 버튼이 클릭되면 토큰을 삭제한다.
    // localstorage에 있는 accessToken 삭제 
    localStorage.removeItem('accessToken');
    // 전역state변수 setAccessToken의 accessToken 값 삭제
    setAccessToken(null);
    navigate('/', {replace : true});
  }

  return(
    <Header>
      <div>
        <UserText onClick={(e)=>{setAnchorEl(e.currentTarget)}}>{loggedInUser.email}<span>님</span></UserText>
        <Popover 
          anchorEl={anchorEl} 
          open={open} 
          onClose={()=>{setAnchorEl(null)}}
          anchorOrigin={ {vertical:'bottom', horizontal:'left'} }
        >
          <p>회원가입일 : {loggedInUser.created_date}</p>
          <p>최근수정일 : {loggedInUser.updated_date}</p>
          <button onClick={onLogout}>로그아웃</button>
        </Popover>
      </div>
      <div onClick={()=>{setIsOpen(!isOpen)}} style={{cursor : "pointer"}}>
        {isOpen ? <MenuOpenIcon/> : <MenuIcon/>}
      </div>
    </Header>
  );
}

export default DashboardHeader;