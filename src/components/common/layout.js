import { useState } from "react";
import { Main, MainWrapper, Wrapper } from "../../styles/common/layout.styles";
import DashboardFooter from "./footer";
import DashboardHeader from "./header";
import DashboardSidebar from "./sidebar";

const DashboardLayout = (props)=>{
  // layout.js는 header.js와 sidebar.js이 포함된 공간이다.
  // 사이드바가 열려있는지 닫혀있는지 확인하는 스테이트 변수
  const [isOpen , setIsOpen] = useState(true);
  return(
    <Wrapper isOpen={isOpen}>
      <DashboardSidebar isOpen={isOpen} target={props.target}/>
      <MainWrapper>
        <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Main>
          {props.children}
        </Main>
        <DashboardFooter/>
      </MainWrapper>
    </Wrapper>
  );
}

export default DashboardLayout;