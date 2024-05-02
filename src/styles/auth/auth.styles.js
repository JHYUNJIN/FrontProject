import styled from "@emotion/styled";

export const BgImg = styled.div`
  /* border: 5px solid black; */
  width: 100%;
  background-image: url('/auth-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
export const Wrap = styled.div`
  /* border: 5px solid green; */
  min-height: 100vh;
  /* background-color: black; */
  background-color: hsla(var(--ui-color-background-100), 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  padding-top: 100px;
  padding-bottom: 150px;

`
export const AuthBox = styled.div`
  /* border: 5px solid black; */
  width: 400px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  & > h1{
    text-align: center;
  }
`
export const AuthForm = styled.form`
  /* border: 3px solid gold; */
  display: flex;
  flex-direction: column;
  row-gap: 60px;
`

export const Input = styled.input`
  background:none;
  padding: 10px 5px;
  border-radius: 10px;
  border: 1px solid hsl(var(--ui-color-foreground-090));
  outline: none;
  width: 100%;
`
export const Button = styled.button`
  padding: 10px 5px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  background-color: hsl(var(--ui-color-primary));
`
export const ErrMsg = styled.p`
  color: red;
  font-size: var(--font-xs);
  padding-left: 10px;
`

export const InputBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`
export const LogoImg = styled.img`
  width: 100px;
  align-self: center;
`
export const AuthBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`
export const Line = styled.div`
  border-top: 1px solid black;
  border-left: 1px solid black;
`
export const AuthFooter = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 15px;
  align-items: center;
  & > .line{
    height: 10px;
  }
`
export const CancelIcon = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
`

export const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  background:none;
  & + input{
    margin-top: 5px;
    border-radius: 1px;
  }
`
export const Option = styled.option`
  background: rgba(256, 256, 256, 0.8);
  padding: 10px;
`

