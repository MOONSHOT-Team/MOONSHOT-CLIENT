import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

const Drawer2 = (props) => {
  return (
    <div css={drawerWrapper}>
      <div>이게</div>
      {props.children}
    </div>
  )
}

const drawerWrapper = css`
  display: flex;
  gap: 2rem;
`

export default Drawer2