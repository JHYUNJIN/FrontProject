import { useContext, useEffect, useState } from "react";
import { AddBox } from "../../styles/dashboard/career.styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { UserContext } from "../../App";
import CareerRow from "./careerRow";

const CareerViewTable = ()=>{
  const [careerList, setCareerList] = useState([]);
  const {accessToken , setAccessToken} = useContext(UserContext);
  // 토큰이 저장되어있는 전역 상태변수 가져오기

  // 최초 로딩이 되었을 때 1번만 mysql가서 데이터 가져오기 --> useEffect(()=>{})[]
  // express에게 요청
  useEffect( ()=>{
    // CareerViewTable이 최초 렌더링 될 때
    // express에게 career목록 좀 가져다줘 라고 요청
    const fetchCareerList = async ()=>{
      if(accessToken === null) return;
      try{
        let res = await axios.get('/api/career' ,
          {headers : {Authorization:`Bearer ${accessToken}`}}
        );
        setCareerList(res.data);
      }catch(err){
        console.log(err);
      }
    }

    fetchCareerList();

  }, [accessToken]);

  // state 변수 네개 , 사용자가 input 태그에 입력한 값을 기억할 용도
  const [company, setCompany] = useState('');
  const [position , setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');




  const onAddCareer = async()=>{
    if(company === ''){
      alert('회사명을 입력해 주세요.');
      return;
    }

    if(position === ''){
      alert('직책을 입력해 주세요.');
      return;
    }

    if(startDate === ''){
      alert('시작일을 입력해 주세요.');
      return;
    }

    // 시작일이 오늘 날짜보다 늦으면 안된다.
    const today = new Date(); // new Date(); 오늘 날짜로 만들어짐
    const targetStartDate = new Date(startDate); // 데이트 타입의 함수로 만들어 비교하여야 한다. 같은 타입끼리 연산가능
    if(targetStartDate > today){
      alert('시작일은 오늘 날짜 이후로 설정할 수 없습니다.');
      return;
    }

    // 재직중인 경우 종료일은 비어있어도 된다.
    if(endDate !== ''){ // 빈문자열은 데이트 타입으로 바꿀 수 없기 때문에 종료일을 입력하지 않았을 때는 비교하면 안된다. 
      const targetEndDate = new Date(endDate);
      // console.log(targetEndDate);
      if(targetStartDate > targetEndDate){
        alert('종료일은 시작일 이후로 설정이 가능합니다.')
        return;
      }
    // 종료일은 오늘 날짜보다 늦을 수 없다.
      if(targetEndDate > today){
        alert('종료일은 오늘 날짜 이후로 설정할 수 없습니다');
        return;
      }

    }


    // 정상적으로 실행되는 코드
    try{
      let res = await axios.post('/api/career', 
        {company, position, startDate, endDate} ,
        // {headers : {Authorization : `Bearer ${accessToken})}`}}
        {headers : {Authorization : `Bearer ${localStorage.getItem('accessToken')}`}}
      );
      // res.data에 내가 방금 추가한 객체가 들어있다.
      // 경력추가에 성공했을 때 알려줄 창
      alert('경력이 추가되었습니다.');
      // 새로고침?!
      // window.location.reload();


      // 새로고침 대신 생각해 볼 수 있는 것
      // 방금 추가한 객체를 이미 20개의 객체가 요소로 들어있는
      // 배열의 마지막 요소로 추가
      // careerList.push()를 사용하면 원본이 바껴버려서
      // 항목이 추가된지 모르고 비교를 제대로 못한다.
      // 그래서 바뀐게 없다 생각하고 다시 그려주지 않는다.
      // 때문에 ...을 사용하여 // ...은 기존의 careerList를 의미한다. 
      // ...careerList에 res.data를 추가하는 방식으로 접근하면
      // 새롭게 그려주게 된다.
      setCareerList( [ ...careerList ,  res.data] );

    }
    catch(err){
      console.log(err);
      alert('서버에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요');
    }

  }

  // td셀 클릭시 삭제하는 함수
  // 데이터베이스에서 삭제해주는 함수
  const onDeleteRow = async (id)=>{
    // id에는 몇번 객체가 삭제되었는지에 대한 정보가 들어있음
    // app.delete('/api/career/:id') 주소에 id값을 넘겨주는 방식
    //  --> req.params에 값이 들어가게 됨
    // 남이 삭제시켜버릴 수도 있는 방법이기때문에 사용하지 않는다.
    // 보안 취약!
    // 그렇기 때문에 req.body에 넣어줘야하는데..
    // '/api/career', { data : {id} }
    // 이렇게 중괄호로 한번 더 감싸주면 body에 들어가게 된다.
    // 감싸지 않으면 body에 안들어감
    try{
      let res = await axios.delete('/api/career', { data : {id} } );
      alert('경력이 삭제되었습니다.');

      // careerList에서 삭제된 id를 가진 요소를 삭제하고 변경하면
      // re-rendering되면서 마치 우리 눈에는 사라진 것처럼 보임
      // 기존 배열에서
      // 삭제된 요소를 걸러주는 함수를 사용해야 하기 때문에
      // filter() 함수를 사용해준다.
      // filter() 함수는 기존배열에서 filter() 함수로 걸러진 
      // 새로운 배열을 만들어준다.
      let cpy = careerList.filter(e=>e.id !== id);
      setCareerList(cpy);
    }
    catch(err){
      alert('삭제 도중 문제가 발생하였습니다.');
    }
  }

  // 전체 체크가 되었는지 아닌지 확인하기 위한 state 변수
  // 처음엔 선택이 되어있지 않아야하니까 false값을 넣어놓는다.
  const [isSelectAll, setIsSelectAll] = useState(false);

  // 차라리 전체 체크 되었다 아니다 이분법적 접근x
  // 개별적으로 체크된 요소의 id를 배열에 보관
  // rendering 할 때 배열안에 있는 행을 그릴때는 체크된채로,
  // 배열 안에 없는 행을 그릴때는 해제된채로
  const [checkedRowId ,setCheckedRowId] = useState([]);


  // 개별적으로 체크 했을때
  const onSelect = (id)=>{
    console.log('개별 체크 됨.');
    if(checkedRowId.includes(id)){ // 체크된 id를 체크 해제 한다면
      setCheckedRowId(checkedRowId.filter((el) => el !== id));
      setIsSelectAll(false); 
      // 전체 선택 후 하나라도 개별 체크를 해제했다면 false값이 들어가게 해줘야
      // 전체 체크박스의 체크가 해제된다.
      return;
    }
    setCheckedRowId( [...checkedRowId, id] );
    //...checkedRowId,id --> 기존의 checkedRowId에 id를 추가해줘
  }
  

  // 전체선택(표의 헤더부분에 있는 체크박스 클릭시 실행)
  const onSelectAll = ( e )=>{
    // console.log(e.target.checked);
    // setIsSelectAll(e.target.checked);
    if(e.target.checked){ // 체크 되어 실행된다면
      setCheckedRowId(careerList.map((e)=>e.id));
      setIsSelectAll(true);
    }else{ // 체크 해제되어 실행 된다면 
      setCheckedRowId([]);
      setIsSelectAll(false);
      // 전체 선택 후 체크를 해제했다면
      // false값을 넣어줘야한다.
    }
    console.log(isSelectAll)
  }

  // 일괄삭제 버튼 함수
  // 브라우저에서 삭제해주는 함수
  const deleteAll = async ()=>{
    // 익스프레스한테 선택된 id들 모두 삭제 요청
    // axios.delete('/api/career', { data: { id: checkedRowId } });
    try{
      let cpy = careerList;
      for(let i = 0; i < checkedRowId.length; i++){
        let id = checkedRowId[i];
        await axios.delete('/api/career', {data : {id}});
        cpy = cpy.filter(row=> row.id !== id);
      }
      setCareerList(cpy); // 반복문 밖에 있어야 한번에 뿅 없어진다.
      alert('정상적으로 삭제되었습니다.');
    }
    catch(err){
      console.log(err);
      alert('삭제 하는 도중 문제가 발생하였습니다.');
    }
    // checkedRowId.forEach(async (id)=>{
    //   try{
    //     await axios.delete('/api/career', {data : {id}});
    //     // setCareerList(careerList.filter((e) => e.id !== id));
           // 커리어리스트의 원본에서 삭제해주는 작업을 반복함.
           // 그러므로 먼저 수행 된 반복문에서 삭제해준 작업은 의미가 없어지게되고
           // 원본에서 마지막 반복을 수행하면서 삭제된 데이터만 보여지게 된다.
           // 브라우저 상의 커리어리스트에서 직접적으로 삭제해주는 코드

    //     // setCareerList((cl)=>{return cl.filter((e) => e.id !== id)});
           // 함수에 넣어주면 첫번째 반복 후 다음 반복에서
           // 원본에서 삭제해주는게 아닌
           // 첫번째 반복을 수행한 최신 상태의 커리어리스트(cl)에서
           // 다음 반복을 수행하여 삭제해줌.
           // 그러므로 한번에 뿅 삭제되는게 아닌 
           // 반복 순서대로 하나씩 삭제하게 된다.
    //     cpy = cpy.filter(row=> row.id !== id);
    //     setCareerList(cpy);
    //   }
    //   catch(err){
    //     console.log(err);
    //     alert('삭제 하는 도중 문제가 발생하였습니다.');
    //   }
    // });
  }

  return(
    <>
      {/* 커리어를 추가하는 섹션 */}
      <section style={ {marginBottom:'50px'} }>
        <AddBox>
          <thead>
            <tr>
              <th rowSpan={2}>회사명(활동)</th>
              <th rowSpan={2}>직책(활동 내용)</th>
              <th colSpan={2}>활동 일자</th>
            </tr>
            <tr>
              <th>시작일</th>
              <th>종료일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input onChange={e=>setCompany(e.target.value)}/></td>
              <td><input onChange={e=>setPosition(e.target.value)}/></td>
              <td><input onChange={e=>setStartDate(e.target.value)} type="date"/></td>
              <td><input onChange={e=>setEndDate(e.target.value)} type="date"/></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}> <button onClick={onAddCareer}>추가하기!</button> </td>
              {/* 추가하기 버튼이 클릭되면 
                  1. 사용자가 입력한 4개의 값이 유효한지 검사
                  2. 유효하다면 4개의 값을 서버로 전달
                  3. 서버는 4개의 값을 받아와서 mysql에 4개의 값을 추가
                  4. 서버에 성공적으로 추가되면 리액트에게 응답
                  5. 리액트는 응답을 받아서 성공적으로 추각 되었다면 화면을 리랜더링
                  6. 리랜더링되면 */}
            </tr>
          </tfoot>
        </AddBox>
      </section> 

      {/* 커리어 리스트를 보여주는 섹션  */}
      <section>
        <AddBox>
          <thead>
            <tr>
              <th>
                <input 
                  onChange={onSelectAll} 
                  type="checkbox"
                  checked={isSelectAll}
                />
              </th>
              <th>회사명</th>
              <th>직책</th>
              <th>일자</th>
              <th onClick={deleteAll}><DeleteOutlineIcon/></th>
            </tr>
          </thead>
          <tbody>
            {careerList.map(( e ) => <CareerRow key={e.id} career={e} checkedRowId={checkedRowId} onSelect={onSelect} onDeleteRow={onDeleteRow}/>)}
            {/* {careerList.map(( e ) =>
            <tr key={e.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={checkedRowId.includes(e.id)}
                  onChange={()=>{onSelect(e.id)}}
                />
              </td>
              <td>{e.company}</td>
              <td>{e.position}</td>
              <td>{e.start_date}-{e.end_date}</td>
              <td style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
                }}><button>삭제</button></td>
            </tr>)} */}  
            {/* 해당 구문 careerRow 함수로 변경함 */}
          </tbody>
        </AddBox>
      </section>
    </>
  );
}

export default CareerViewTable;