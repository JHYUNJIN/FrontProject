import { useContext, useEffect, useState } from "react";
import { CommentInputWrap, CommentInput, CommentWriteBtn, CommentListWrap} from "../../styles/dashboard/activityComment.styles";
import axios from "axios";
import { UserContext } from "../../App";
import CommentBlock from "../comment/commentBlock";
import {useInView} from "react-intersection-observer";

const ActivityCommentSection = (props) => {
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState('');
  const{accessToken} = useContext(UserContext);
  const [currentPage,setCurrentPage] = useState(1);
  const [isEnd,setIsEnd] = useState(false); // 댓글을 끝까지 다 가져왔다면 true 아니면 false 반환
  // console.log('@isEnd : ',isEnd);

  // ref는 관찰할 요소를 알려주는 변수
  // inView는 관찰할 요소가 화면에 나타나면 true 아니면 false 값이 반환되는 변수
  const [ref,inView] = useInView();
  // useEffect(()=>{
  //   console.log('inView 실행됨', inView);
  // },[inView]); 


  useEffect(() => { // 무한스크롤 함수
    let tmp = async () => {
      if(accessToken === null) return;
      if(inView === false) return;
      // console.log('@@isEnd : ',isEnd);
      if(isEnd === true) return;
      try { // res.data에 댓글에 대한 정보가 들어있음
        let res = await axios.get(`/api/comments?activityId=${props.activityId}&limit=${3}&page=${currentPage}`,{
          headers:{Authorization:`Bearer ${accessToken}`}
        });
        setCurrentPage(currentPage+1);
        if(res.data.length === 0){
          // console.log('@@@isEnd : ',isEnd);
          setIsEnd(true);
        }
        setCommentList([...commentList, ...res.data]); // 기존에 있던 commentList랑 새롭게 받아온 res.data를 붙여준다. -> 3 -> 6 -> 9 ...
      } catch (err) {
        alert('댓글목록 오류');
      }
    }
    tmp();
  }, [props.activityId, accessToken, inView]); // inView가 바뀌면 useEffect 함수 실행

  const onCommentClick = async ()=>{ // 댓글추가 함수
    try{
      let res = await axios.post('/api/comments', {
        content, // key와 value가 같을때는 생략가능 == content : content
        activityId : props.activityId
      },
      {headers:{Authorization:`Bearer ${accessToken}`}}
    );
    // setCommentList([...commentList, res.data]); // 기존에 있던 commentList에 res.data를 추가해줘
    // 만약 댓글목록을 끝까지 다 가져온 상태에서 댓글을 추가했을때, 화면에 추가한 댓글이 바로 보이게 해줘
    if(isEnd === true){
      setCommentList([...commentList, res.data])
    }
    alert('댓글추가 성공');
    }catch(err){
      alert('댓글추가 중 오류 발생 ..!');
    }
  }

  // 댓글 ID를 매개변수로 받아와서 해당 ID를 가진 댓글 삭제
  const onDeleteClick = async (id)=>{
    let result = window.confirm('정말 삭제하시겠습니까?'); 
    console.log(result); // result == true or false
    if(result === false) return;
    
    // 확인을 눌렀다면 express에게 삭제요청
    try{
      await axios.delete('/api/comments', {data:{id}});
      setCommentList(commentList.filter((el)=>{return el.id !== id})); // filter함수 결과가 true면 남고 false면 거른다.
      alert('댓글삭제 성공');
    }catch(err){
      alert('댓글 삭제 실패, 잠시 후 다시 시도해주세요')
    }
  }

  return (
    <section>
      <CommentInputWrap>
        <CommentInput onChange={(e)=>{setContent(e.target.value)}} value={content}/>
        <CommentWriteBtn onClick={onCommentClick}>댓글작성</CommentWriteBtn>
      </CommentInputWrap>
      <CommentListWrap>
        {
          commentList.map((comment) => <CommentBlock // 각각 1개씩 state 변수가 필요하다면 Component로 분리하자
          key = {comment.id} 
          onDeleteClick={onDeleteClick} 
          comment={comment} />) 
        }
        <div ref={ref} style={{backgroundColor:'red'}}></div>
      </CommentListWrap>
    </section>
  );
}

// 무한스크롤 inView 태그 : <div ref={ref} style={{backgroundColor:'red'}}></div>

export default ActivityCommentSection;