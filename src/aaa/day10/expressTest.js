import axios from "axios";
import { useRef, useState } from "react";

const ExpressTestPage = ()=>{

  const [employees, setEmployees] = useState([]);

  const onExpressClick = ()=>{
    axios.get('/api')
    .then((res)=>{
      console.log('.응답 받아옴!!', res);
    }).catch((err)=>{ console.log('실패!!', err)});
  }

  const getEmployees = ()=>{
    axios.get('/api/employees').then((res)=>{
      console.log(res.data);
      setEmployees(res.data);
    }).catch((err)=>{console.log(err)});
  }

  const fetchEmployees = ()=>{
    fetch('/api/employees')
      .then((res)=>{return res.json()})
      .then((data)=>{console.log(data)})
      .catch((err)=>{console.log(err)});
  }

  const empNameRef = useRef(null);

  const addEmp = ()=>{
    // document.querySelector('#emp_name')
    // document.querySelector를 통해 태그를 가져오는  것이 아닌
    // Ref 객체를 통해 태그를 가져온다 
    console.log(empNameRef.current.value);

  }

  return(
    <>
      <h1>입력!</h1>
      <label>
        사원이름
        <input ref={empNameRef} id="emp_name"/>
      </label>
      <label>
        사원 봉급
        <input id="salary"/>
      </label>
      <button onClick={addEmp}>추가하기!</button>

      <h1>사원목록!</h1>
      {employees.map((e)=> <div key={e.id}>사원이름 : {e.emp_name}, 사원번호 : {e.id}, 봉급 : {e.salary}</div>)}
      {/* <div>사원이름 : 홍길동, 사원번호 : 1, 봉급 : 1000</div>
      <div>사원이름 : 홍길동, 사원번호 : 1, 봉급 : 1000</div>
      <div>사원이름 : 홍길동, 사원번호 : 1, 봉급 : 1000</div>
      <div>사원이름 : 홍길동, 사원번호 : 1, 봉급 : 1000</div> */}
      <h1>익스프레스 통신 테스트 페이지 입니다!</h1>
      <button onClick={onExpressClick}>버튼입니다!</button>
      <button onClick={getEmployees}>mysql 데이터를 가져와 보겠습니다</button>
      <button onClick={fetchEmployees}>fetch로 모든 직원 정보보기</button>
    </>
  );
}

export default ExpressTestPage;