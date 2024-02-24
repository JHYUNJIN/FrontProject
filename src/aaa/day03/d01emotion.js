import styled from '@emotion/styled'

function EmotionComponent(){
  return(

    <Wrap>
      <Title>이모션</Title>
      <p>이모션을 활용하여 css가 적용된 컴포넌트 사용</p>
      <Title>다시사용</Title>
    </Wrap>
  )



}

const Wrap = styled.div`
  border: 3px solid black;
  width: 800px;
  margin: 0 auto;

  & p{
    background-color: aqua;
  }

  &:hover{
    background-color: red;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  color: aqua;
`


export default EmotionComponent;