import { useContext, useEffect, useState } from "react";
import { CommentInputWrap, CommentInput, CommentWriteBtn, CommentListWrap, CommentItem, CommentHeader, CommentWriter, CommentDate, CommentBtn, Comment } from "../../styles/dashboard/activityComment.styles";
import axios from "axios";
import { UserContext } from "../../App";

const ActivityCommentSection = (props) => {
  const [commentList, setCommentList] = useState([]);
  const{accessToken} = useContext(UserContext);

  useEffect(() => {
    let tmp = async () => {
      if(accessToken === null) return;
      try {
        let res = await axios.get(`/api/comments?activityId=${props.activityId}`,{
          headers:{Authorization:`Bearer ${accessToken}`}
        });
        setCommentList(res.data);
      } catch (err) {
        alert('댓글목록 오류');
      }
    }
    tmp();
  }, [props.activityId, accessToken]);

  return (
    <section>
      <CommentInputWrap>
        <CommentInput />
        <CommentWriteBtn>댓글작성</CommentWriteBtn>
      </CommentInputWrap>
      <CommentListWrap>
        {
          commentList.map((comment) => <CommentItem>
            <CommentHeader>
              <CommentWriter>작성자 id : {comment.writer_email}</CommentWriter>
              <CommentDate>(작성일){comment.created_date}</CommentDate>
              <CommentDate>(수정일){comment.updated_date}</CommentDate>
              {comment.owner && <CommentBtn>삭제</CommentBtn>}
            </CommentHeader>
            <Comment>{comment.content}</Comment>
          </CommentItem>)
        }
      </CommentListWrap>
    </section>
  );
}

export default ActivityCommentSection;