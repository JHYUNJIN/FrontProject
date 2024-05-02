import {Link} from 'react-router-dom';

const RoterPage = ()=>{
  return(
    <>
      <h1>라우팅</h1>
      <p>리액트에서 라우팅하는 방법</p>
      <Link to='abc'>소개로 이동</Link>
    </>
  )
}



export default RoterPage;