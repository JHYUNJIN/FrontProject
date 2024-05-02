import styled from "@emotion/styled";
import HomeIcon from '@mui/icons-material/Home';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { DashboardOutlined } from "@mui/icons-material";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';


//컴포넌트를 만들 때 컴포넌트 이름은 
//대문자로 시작해야한다!!!
const Wrapper=styled.div`
 display: flex;
  border-width: 10px;
  padding-left: 240px;
  transition: 300ms;
`;

const DashboardAside = styled.aside`
width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 0 20px;
  background-color: hsl(var(--ui-color-background-100));

  &::-webkit-scrollbar{
  display: none;
}
`;

const AsideLogo=styled.div`
 height: 90px;
  /* margin-bottom: 50px; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  column-gap: 10px;
  &>img{
    /* width: 70px;
    height: 70px; */
    height: 100%;
}
`;

const AsideMenuItem=styled.div`
  cursor: pointer;
  transition: 500ms;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
  column-gap: 10px;
  font-size: var(--font-base);
  color: hsl(var(--ui-color-foreground-090));
  position:relative;
  &:hover{
    background-color: hsl(var(--ui-color-background-090));
  }
  &>p{
    flex-grow: 1;
    margin: 0;
  }
  &>.sub_icon{
    /* color: red; */
    position: absolute;
    left: -8px;
    top: 8px;
  }
  &>svg{
    font-size: 16px;
  }

  ${(props)=> props.active && 
    {backgroundColor : 'hsl(var(--ui-color-background-090))' }
  }
`;

const Menu=styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const SubMenu = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  margin-top: 3px;
  padding-left: 35px;
`;

const LogoText = styled.p`
  font-size: var(--font-xl);
  font-weight: bold;
  color: hsl(var(--ui-color-primary));
`;

const UserText=styled.p`
  font-size: var(--font-xl);
  font-weight: bold;
  color: hsl(var(--ui-color-primary));
  &>span{
    color: hsl(var(--ui-color-foreground-100));
    font-size: var(--font-sm);
  }
`;

const MainWrapper = styled.div`
  flex-grow:1;
`;

const Main = styled.main`
  padding: 30px 20px;
`;

const Header = styled.header`
  height: 90px;
  position:sticky;
  top: 0;

  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: hsl(var(--ui-color-background-100));
  /* backdrop-filter: blur(5px); */

  justify-content: space-between;
`;

const Footer = styled.footer`
  border-top: 1px solid hsl(var(--ui-color-foreground-000));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

const DashboardPage=()=>{
  return(
    <Wrapper>
      <HomeIcon/>
      안녕
      <AndroidIcon/>
      <AppleIcon/>
    <DashboardAside>
      <AsideLogo>
        <img src={'/logo.svg'} alt="logo"/>
        {/* <Image/> 태그에는 4가지 속성값 모두 있어야한다. */}
        <LogoText>Portfolio For</LogoText>
      </AsideLogo>
      <nav>
        <Menu>
          <li >
            <AsideMenuItem>
              <DashboardOutlined/>
              <p>Overview</p>
              <KeyboardArrowRightOutlinedIcon/>
            </AsideMenuItem>
          </li>
          <li >
            <AsideMenuItem>
              <AssignmentIndOutlinedIcon/>
              <p>경력</p>
              <KeyboardArrowRightOutlinedIcon></KeyboardArrowRightOutlinedIcon>
            </AsideMenuItem>
          </li>
          <li >
            <AsideMenuItem>
              <TopicOutlinedIcon/>
              <p>나의 활동</p>
              <KeyboardArrowDownOutlinedIcon/>
            </AsideMenuItem>
            <SubMenu>
              <li>
                <AsideMenuItem>
                  <SubdirectoryArrowRightOutlinedIcon className="sub_icon"/>
                  <p>봉사활동</p>
                  <KeyboardArrowRightOutlinedIcon/>
                </AsideMenuItem>
              </li>
              <li>
                <AsideMenuItem>
                  <SubdirectoryArrowRightOutlinedIcon className="sub_icon"/>
                  <p>독서활동</p>
                  <KeyboardArrowRightOutlinedIcon/>
                </AsideMenuItem>
              </li>
            </SubMenu>
          </li>
          <li >
            <AsideMenuItem>
              <ChecklistOutlinedIcon/>
              <p>할일 목록</p>
              <KeyboardArrowRightOutlinedIcon/>
            </AsideMenuItem>
          </li>
        </Menu>
      </nav>
    </DashboardAside>
    <MainWrapper>
      <Header>
        <UserText>정현진<span>님</span></UserText>
        <i class="fa-solid fa-bars menu-icon"></i>
      </Header>
      <Main>
      </Main>
      <Footer>
        ⓒ 2023. JHJ all rights reserved
      </Footer>
    </MainWrapper>
  </Wrapper>
  )
}


export default DashboardPage;
