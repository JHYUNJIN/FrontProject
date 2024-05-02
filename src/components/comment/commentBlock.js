import { useContext, useState } from "react";
import { Comment, CommentBtn, CommentDate, CommentHeader, CommentItem, CommentWriter } from "../../styles/dashboard/activityComment.styles";
import axios from "axios";
import { UserContext } from "../../App";

const CommentBlock = (props) => {
  const [comment, setComment] = useState(props.comment);
  let onDeleteClick = props.onDeleteClick;

  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(comment.content);

  const {accessToken} = useContext(UserContext);

  const onUpdateComment = async ()=>{
    if(accessToken === null) return;
    // express에게 기존댓글 수정 요청
    try{
      let res = await axios.put('/api/comments', {
        id : comment.id,
        content // key와 value가 같으므로 생략가능 === content : content
      }, {headers : {Authorization: `Bearer ${accessToken}`}});
      setIsEdit(false);
      setComment(res.data); //res.data --> 수정완료된 댓글이 객체로 들어있다.
    }catch(err){
      alert('댓글 수정 실패..');
    }
  }


  return (
    <CommentItem>
      <CommentHeader>
        <CommentWriter>작성자 id : {comment.writer_email}</CommentWriter>
        <CommentDate>(작성일){comment.created_date}</CommentDate>
        <CommentDate>(수정일){comment.updated_date}</CommentDate>
        {comment.owner && <CommentBtn onClick={() => onDeleteClick(comment.id)}>삭제</CommentBtn>}
      </CommentHeader>
      { isEdit  
        ? <input onBlur={onUpdateComment} onChange={(e)=>setContent(e.target.value)} value={content} /> 
        : <Comment onClick={()=>{if(comment.owner) setIsEdit(true)}} >{comment.content}</Comment>}
    </CommentItem> // if(comment.owner) => 댓글 소유자만 수정이 가능함.
  );
}

// 값을 전달하는것은 props로 전달해준다. 
// 부모에게 있는 함수를 자식에서 사용하고 싶다면 props로 전달할수있다.
// 참고) 삭제버튼은 owner 값이 true일 경우 보여진다. -> res.json({...rows[0], owner:rows[0].writer_email === user.email}); // 구조 분해 할당 

export default CommentBlock;