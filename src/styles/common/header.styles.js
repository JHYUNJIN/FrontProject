import styled from "@emotion/styled";

export const Header = styled.header`
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