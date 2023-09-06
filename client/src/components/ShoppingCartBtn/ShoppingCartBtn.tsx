import { Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import './ShoppingCartBtn.css'

function ShoppingCartBtn() {
  return (
    <>
    <Button className="shopping--btn" type="text">
      <ShoppingOutlined></ShoppingOutlined>
    </Button>
    </>
  )
}

export default ShoppingCartBtn