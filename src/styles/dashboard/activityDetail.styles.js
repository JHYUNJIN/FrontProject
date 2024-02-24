import styled from "@emotion/styled";

export const BoardDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const BoardTitle = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid silver;
  font-size: 18px;
  padding: 20px;
  background-color: #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  & span{ // 자손
    font-size: 14px;
  }
`;

export const BoardInfoWrap = styled.div`
  display: flex;
  border-bottom: 1px solid silver;
  &>p{
    padding: 20px;
  }

  & > p:nth-of-type(odd){
    width: 20%;
    text-align: center;
    border-right: 0.5px solid silver;
    border-left: 0.5px solid silver;
    
  }
  & > p:nth-of-type(even){
    width: 40%;
  }
`;

export const BoardContent = styled.div`

  padding: 40px 20px;
  border-bottom:1px solid silver;
`;

export const WriteBtn = styled.button`
  align-self:flex-end;
  margin-top: 20px;
  border-radius: 0;
  padding: 6px 20px;
  border: none;
  background-color: aqua;
  cursor: pointer;
`
