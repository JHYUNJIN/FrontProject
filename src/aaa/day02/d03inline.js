function Inline(){
  return(
    <>
      <h1>인라인 스타일 적용방법</h1>
      <p style={
        {
          color:'red',
          marginLeft:'100px',
          border : '1px solid black'
        }
      }>
        리액트의 jsx 중 html 태그와 이름이 똑같이 만들어져 있는
        jsx에서 Inline 스타일을 입히기 위해서는 
        style 속성에 적용시킬 css 속성들을 객체로 대입해야한다.
    </p>
    </>
  );
}

export default Inline;
