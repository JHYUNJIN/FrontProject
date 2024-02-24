import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";

const CareerRow = (props) => {
  // 만일 isEdit에 true가 들어있으면 해당 행이 수정 상태임을 의미하고
  // isEdit에 false가 들어있으면 해당 행이 수정상태가 아님을 의미한다
  const [isEdit, setIsEdit] = useState(false);

  // 수정될 때 마다 리렌더링 될 필요가 없기 때문에
  // ref 객체로 선언해주자!
  // 참고) 로그인 시 id를 state변수로 선언해 리렌더링 해주는 이유는
  // id 양식이 맞춰지면 리렌더링 되어 즉각적으로 오류를 없애주기 위함이다.
  const companyInputRef = useRef(null);
  const positionInputRef = useRef(null);
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const {accessToken} = useContext(UserContext);

  const dateFormat = (date) => {
    // '2023년10월01일' --> '2023-10-01'
    // / /g --> 문자열 안에 있는 모든 띄어쓰기를 의미함
    console.log(date)
    return date
      .replace("년", "-")
      .replace("월", "-")
      .replace("일", "")
      .replace(/ /g, ""); // 모든 띄어쓰기를 "" 빈문자열로 바꾼다.
  };

  // props.career = e;
  // props.checkedRowId
  const e = props.career;
  const { checkedRowId, onSelect, onDeleteRow } = props;

  // 상태를 수정상태로 변경해주는 함수
  const onEditState = () => {
    setIsEdit(true);
  };

  const onEditClick = async ( id ) => {
    // id에는 수정할 행의 id가 들어있음
    // 수정하기 버튼 클릭시 실행될 함수
    // 1. 사용자가 입력한 company, postion, startDate, endDate 가져오기
    const company = companyInputRef.current.value;
    const position = positionInputRef.current.value;
    const startDate = startDateInputRef.current.value;
    const endDate = endDateInputRef.current.value;

    // 유효성 검사
    if(company === ''){
        alert('회사명을 입력해주세요.');
        return;
    }
    if(position === ''){
        alert('직책을 입력해주세요.');
        return;
    }
    if(startDate === ''){
        alert('시작일을 입력해주세요.');
        return;
    }
    const today = new Date();
    const startDateTmp = new Date(startDate);

    if(startDateTmp > today){
        alert('시작일은 오늘 날짜 이후로 설정할 수 없습니다.');
        return;
    }

    if(endDate !== ''){
        const endDateTmp = new Date(endDate);
        if(endDateTmp < startDateTmp){
            alert('종료일은 시작일 이전으로 설정할 수 없습니다.')
            return;
        }

        if(endDateTmp > today){
            alert('종료일은 오늘 날짜 이후로 설정할 수 없습니다.');
            return;
        }
    }

    // 유효한 값들이 입력되었음을 확인했다면
    // express 서버에 입력한 값들을 전달하여 수정 요청하기
    // 수정이 완료될 때 까지 기다려주기 위해서 await 함수를 사용한다.
    try{
        await axios.put('/api/careers' , {company, position, startDate, endDate, id}, 
            {headers : {Authorization : `Bearer ${accessToken}`}}
        )
        alert('수정되었습니다.');
        // 수정상태를 false 로바꾸기
        setIsEdit(false);
        // e 안에 있는 company, position , startDate, endDate를
        // 수정한 객체로 변경
        e.company = company;
        e.position = position;
        e.start_date = startDate;
        e.end_date = endDate;
    }catch(err){
        console.log(err);
        alert('오류발생');
    }



  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checkedRowId.includes(e.id)}
          onChange={() => {
            onSelect(e.id);
          }}
        />
      </td>
      <td onClick={onEditState}>
        {isEdit ? <input ref={companyInputRef} defaultValue={e.company} /> : e.company}
      </td>
      <td onClick={onEditState}>
        {isEdit ? <input ref={positionInputRef} defaultValue={e.position} /> : e.position}
      </td>
      <td onClick={onEditState} style={{ display: "flex" }}>
        {isEdit ? (
          <input ref={startDateInputRef} defaultValue={dateFormat(e.start_date)} type="date" />
        ) : (
          e.start_date
        )}
        -
        {isEdit ? (
          <input ref={endDateInputRef} defaultValue={dateFormat(e.end_date)} type="date" />
        ) : (
          e.end_date
        )}
      </td>
      <td
        onClick={() => { 
            if(isEdit){ onEditClick(e.id); } 
            else{ onDeleteRow(e.id); }
        }}
        style={{
          cursor: "pointer",
        }}
      >
        {isEdit ? <EditIcon /> : <DeleteOutlineIcon />}
      </td>
    </tr>
  );
};

export default CareerRow;
