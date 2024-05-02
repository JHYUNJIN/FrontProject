import styled from "@emotion/styled";

export const CommentInputWrap = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const CommentDate = styled.div`
  margin: 0 5px;
`

export const CommentInput = styled.input`
  flex-basis: 80%;
  border: 1px solid silver;
  padding: 20px;
`;

export const CommentWriteBtn = styled.button`
  flex-basis: 20%;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;


export const CommentListWrap = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 10px;
`;

export const CommentItem = styled.div`
  border-bottom: 1px solid silver;
  padding: 10px;
`;

export const CommentHeader = styled.div`

  display: flex;
  padding:10px 0;
  align-items: center;
`;

export const CommentWriter = styled.div`
  flex-grow: 1;
`;

export const CommentBtn = styled.button`
  flex-grow: 0;
  cursor: pointer;
  margin: 0 10px;
  padding: 2px 10px;
`;

export const Comment = styled.div`

`;