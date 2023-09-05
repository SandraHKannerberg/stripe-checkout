import LogInBtn from "../LogInBtn/LogInBtn"
import ShoppingCartBtn from "../ShoppingCartBtn/ShoppingCartBtn"
import { Space } from "antd"

function NavBar() {
  return (
    <Space style={{'marginBottom' : '0.3rem'}}>
        <LogInBtn></LogInBtn>
        <ShoppingCartBtn></ShoppingCartBtn>
    </Space>
  )
}

export default NavBar