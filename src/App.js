// import Bae from './aaa/day01/d01MyComponent';
// import EmotionComponent from './aaa/day03/d01emotion';
// import RouterPage from './aaa/day03/d02router';
// import ErrorPage from './aaa/day03/d03err';
import DashboardPage from './aaa/dashboard/dashboard';
// import ConditionalPage from './aaa/day05/01conditional';
// import StatePage from './aaa/day06/d01state';
// import MapPage from './aaa/day07/d01map';
// import UseEffectPage from './aaa/day08/d01useEffect';
// import BoardListFetch from './aaa/day09/d01boardList';
// import BoardListAxios from './aaa/day09/d02boardList';
// import ExpressTestPage from './aaa/day10/expressTest';

import {  RouterProvider,  createBrowserRouter } from 'react-router-dom';
import JoinPage from './pages/auth/join';
import IndexPage from './pages';
import LoginPage from './pages/auth/login';
import ErrorPage from './pages/404';
import ValidateTest from './aaa/day11/validate';
import { createContext, useState } from 'react';
import CareerPage from './pages/dashboard/career';
import ActivityPage from './pages/dashboard/activity';
import ActivityDetailPage from './pages/dashboard/activityDetail';
import RefTestComponent from './aaa/day12/refTest';
import TodoPage from './pages/dashboard/todo';


const router = createBrowserRouter([
  // {path:'/', element:<Bae/>, errorElement:<ErrorPage/>},
  // {path:'/abc', element:<EmotionComponent/>},
  // {path:'/bbb', element:<RouterPage/>},
  {path:'/dashboard', element:<DashboardPage/>},
  // {path:'/conditional', element: <ConditionalPage/> },
  // {path:'/state', element: <StatePage/>},
  // {path:'/map', element: <MapPage/>},
  // {path:'/useEffect', element:<UseEffectPage/>},
  // {path:'/fetch-list', element: <BoardListFetch/>},
  // {path:'/axios-list', element: <BoardListAxios/>},
  // {path:'/express', element: <ExpressTestPage/>},
  {path:'/', element: <IndexPage/> , errorElement:<ErrorPage/>},
  {path:'/join', element: <JoinPage/>},
  {path:'/login', element: <LoginPage/>},
  {path:'/validate', element :<ValidateTest/>},
  {path:'/career', element : <CareerPage/>},
  {path:'/activity', element : <ActivityPage/>},
  {path:'/activity/:id', element : <ActivityDetailPage/>},
  {path:'/day12/refTest', element:<RefTestComponent/>},
  {path:'/todo', element:<TodoPage/>}
]);


// export const Test = createContext();
export const UserContext = createContext();

const App = ()=>{
  // 전역에서 사용할 스테이트 변수
  // return(
    // <Test.Provider value={ {age:10,name:"정현진"} }>
      // <RouterProvider router={router}/>
    // </Test.Provider>
  // )

  // 토큰을 전역 스테이트변수에 담아 모든 페이지에서 토큰을 사용가능하게 해준다.
  const [ accessToken, setAccessToken ] = useState(null);
  // 로그인을 했지만 새로고침을 하면
  // accessToken에는 null 값이 들어가버린다.
  return (
    <UserContext.Provider value={ {accessToken, setAccessToken} }>
      <RouterProvider router={router}/>
    </UserContext.Provider>

  );
}

// function App() {
//   return (
//     <BrowserRouter >
//       <Routes >
//         <Route errorElement={<ErrorPage/>} path='/' element={<Bae />} />
//         <Route path='/abc' element={<EmotionComponent />} />
//         <Route path='/bbb' element={<RouterPage />} />
//       </Routes>
//     </BrowserRouter>
    
//   );
// }

export default App;
