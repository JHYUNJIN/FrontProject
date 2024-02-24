import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
   // </React.StrictMode> // 엄격 검사 모드, 최초로 그린 후 다시 지웠다가 그리는 과정을 실행하여 두번 그렸을 때도 이상이 없는지 확인하기 위한 용도

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
