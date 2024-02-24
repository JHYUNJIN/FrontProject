import styled from "@emotion/styled";

export const DashboardAside = styled.aside`
  transition: 0.3s;
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

export const AsideLogo = styled.div`
  height: 90px;
  /* margin-bottom: 50px; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  column-gap: 10px;
  & > img{
    height: 100%;
  }
`;

export const AsideMenuItem = styled.div`
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
  & > p{
    flex-grow: 1;
    margin: 0;
  }
  & > .sub-icon{
    position: absolute;
    left: -13px;
    top: 7px;
  }

  & > svg{
    font-size: 16px;
  }

  ${(props)=> props.active && 
    {backgroundColor : 'hsl(var(--ui-color-background-090))' }
  }

`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const SubMenu = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  margin-top: 3px;
  padding-left: 35px;
`;

export const LogoText = styled.p`
  font-size: var(--font-xl);
  font-weight: bold;
  color: hsl(var(--ui-color-primary));
`;

export const UserText = styled.p`
  font-size: var(--font-xl);
  font-weight: bold;
  color: hsl(var(--ui-color-primary));
  & > span{
    color: hsl(var(--ui-color-foreground-100));
    font-size: var(--font-sm);
  }
`;