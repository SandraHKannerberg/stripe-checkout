import LogInBtn from "../LogInBtn/LogInBtn"
import ShoppingCartIconBtn from "../ShoppingCartIconBtn/ShoppingCartIconBtn"
import { Space } from "antd"
import "./NavBar.css"

function NavBar() {
  return (
    <Space style={{'marginBottom' : '0.3rem', 'display':'flex', 'justifyContent':'flex-end'}}>
        <LogInBtn></LogInBtn>
        <ShoppingCartIconBtn></ShoppingCartIconBtn>
    </Space>
  )
}

export default NavBar