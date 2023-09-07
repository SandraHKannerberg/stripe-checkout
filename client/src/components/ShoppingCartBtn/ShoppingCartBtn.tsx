import { Button, Drawer, Badge } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import './ShoppingCartBtn.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';
import { useState } from "react";

function ShoppingCartBtn() {

  const [open, setOpen] = useState(false);

  const showShoppingCartDrawer = () => {
  setOpen(true);
  };

  const onClose = () => {
  setOpen(false);
  };


  return (
    <>
    <Badge count={5}>
      <Button className="shopping--btn" type="text" onClick={showShoppingCartDrawer}>
        <ShoppingOutlined></ShoppingOutlined>
      </Button>
    </Badge>

    <Drawer title="Din Kundkorg" placement="right" onClose={onClose} open={open}>
      <ShoppingCart></ShoppingCart>
      <CheckoutBtn></CheckoutBtn>
    </Drawer>
    </>
  )
}

export default ShoppingCartBtn