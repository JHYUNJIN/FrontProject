import styled from '@emotion/styled'

function EmotionComponent(){
  return(
    <Box>
      <div>
        <Title>이모션을 활용한 컴포넌트</Title>
        <p>이모션 컴포넌트 입니다.</p>
      </div>
    </Box>
  );


}

let Box = styled.div`
  background-color : silver;
  width:800px
`;

let Title=styled.h1`
  margin:0;
  font-size:36px
`;





export default EmotionComponent