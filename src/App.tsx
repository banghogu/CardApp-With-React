/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Text from './components/shared/Text'
import BaseButton from './components/shared/Button'
import Input from './components/shared/Input'
import TextField from './components/shared/TextField'
import Alert from './components/shared/Alert'

const bold = css`
font-weight:bold
`

const containerStyles = css`
background-color:pink;
`
const Btn = styled.button`
width:200px;
height:100px;
${bold}
`

function App() {

  return (
    <div css={containerStyles}>

      <Btn>버튼임</Btn>
      <Text typography='t1' display='block' color='red'>t1</Text>
      <Text typography='t2' display='block'>t1</Text>
      <Text typography='t3' display='block'>t1</Text>
      <BaseButton color='primary' full>클릭해주세요</BaseButton>
      <BaseButton>클릭해주세요</BaseButton>
      <BaseButton>클릭해주세요</BaseButton>
      <Input placeholder='로그인'/>

      <TextField label='아이디'/>
      <TextField label='비밀번호' hasError={true}/>

      <Alert title='예시 입니다' onButtonClick={()=>{}} open={true}/>
    </div>
  )
}

export default App
