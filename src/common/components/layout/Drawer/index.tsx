import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

const Drawer = () => {
  return (
    <div css={drawerWrapper}>
      <div>Drawer</div>
      <Outlet />
    </div>
  )
}

const drawerWrapper = css`
  display: flex;
  gap: 2rem;
`

export default Drawer