import { useEffect, useState } from "react";

const Child = (props)=>{
  useEffect(()=>{
    console.log(props.componentTitle,'번 자식이 만들어짐');
    return ()=>{
      console.log(props.componentTitle,'번 자식이 삭제됨!!');
      //부모의 state변수 cnt를 0으로 변경
      // setCnt
      props.setCnt(0);
      //부모의 state변수 msg를 '기본값'으로 변경
      // setMsg
      props.setMsg('기본값');
    }
  },[]);
  
  const onRemoveClick = (number)=>{
    console.log(number); 
    // props.setAr([1,3])

    props.setAr(props.ar.filter((e)=>{return e!==number}))
    
  }
  //map함수는 기존배열을 기반으로 새로운 배열을 만들어줌
  //filter함수는 기존배열을 기반으로 

  // const wrapFunc=(aaa)=>{
  //   onRemoveClick(props.componentTitle)
  // }

  return(
    <>
      <h1>{props.componentTitle}번 자식컴포넌트입니다.</h1>
      <button onClick={()=>onRemoveClick(props.componentTitle)}>삭제!</button>
      {/* <button onClick={onRemoveClick}>삭제!</button> */}
    </>
  )
}

const UseEffectPage = ()=>{
  const [cnt,setCnt] = useState(0);
  // useState는 cnt 값이 변경 될 경우 다시 그려달라는 명령어이다.
  const [msg,setMsg] = useState("기본값");
  

  console.log('안녕하세요'); // 렌더링될때마다 실행됨

  useEffect(()=>{
    console.log('의존성배열이 없다면 ?');
  })

  useEffect(()=>{ // 최초렌더링될때만 실행됨
    console.log('useEffectPage가 최초 렌더링 될때만 실행');
  },[]);
  
  useEffect(()=>{ // 최초렌더링될때 그리고 cnt가 바뀔때만 실행됨
    console.log('cnt가 변경되면 실행');
    return()=>{console.log('cnt unmount')}
  },[cnt]);
  
  useEffect(()=>{ // 최초렌더링될때 그리고 msg가 바뀔때만 실행됨
    console.log('msg가 변경되면 실행')
  },[msg]);
  
  useEffect(()=>{ // 최초렌더링될때 그리고 cnt 또는 msg가 바뀔때 실행됨
    console.log('msg 또는 cnt가 변경되면 실행')
  },[cnt, msg]);
  
  useEffect(()=>{ // unmount될 때 실행(기존컴포넌트가 사라질 때)
    return()=>{
      console.log('unmount될 때 실행(기존컴포넌트가 사라질 때)')
    }
  },[]);
  
  

  const plusClick=()=>{
    setCnt(cnt+1);
  }
  const minusClick=()=>{
    setCnt(cnt-1);
  }

 
  // state변수로 만들면 값이 변경될때마다 브라우저에 그려준다.
  const [ar,setAr] = useState([1,2,3]); 

  return(
    <>
      {/* <Child abc={setAr} componentTitle={1}/>
      <Child abc={setAr} componentTitle={2}/>
      <Child abc={setAr} componentTitle={3}/> */}
      {ar.map((e)=> <Child key={e} setCnt={setCnt} setMsg={setMsg} setAr={setAr} ar={ar} componentTitle={e}/> )}
      <h1>UseEffectPage</h1>
      <h1>{cnt}</h1>
      {/* <button onClick={plusClick}>+</button> */}
      {/* <button onClick={minusClick}>-</button> */}
      <button onClick={()=>setCnt(cnt+1)}>+</button>
      <button onClick={()=>setCnt(cnt-1)}>-</button>
      <p>{msg}</p>
      <input onChange={(e)=>setMsg(e.target.value)} />
    </>
  )
}


export default UseEffectPage;