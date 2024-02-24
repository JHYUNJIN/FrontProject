import styled from "@emotion/styled";

export const Title = styled.h1`
  font-size: 20px;
`;

export const AddBox = styled.table`
  width: 100%;
  overflow: auto;
  border: 1px solid silver;

  & > thead{
    background-color: silver;
  }

  & td{
    padding: 0;
  }

  & input{
    width: 100%;
    padding: 5px 10px;
    outline: none;
    border: 1px solid black;
  }

  & button{
    width: 100%;
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    background-color: beige;
  }
`;

