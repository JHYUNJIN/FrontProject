import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  border-width: 10px;
  padding-left: ${(props)=> props.isOpen ? '240px' : '0'};
  transition: 300ms;
`;

export const MainWrapper = styled.div`
  flex-grow: 1;
`;

export const Main = styled.main`
  padding: 30px 20px;
`;