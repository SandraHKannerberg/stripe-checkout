import { Button, Drawer, Badge } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import './ShoppingCartBtn.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';
import LogInBtn from '../LogInBtn/LogInBtn';
import { useState } from "react";
import { useProductContext } from '../../context/ProductContext';
import { useCustomerContext } from '../../context/CustomerContext';

function ShoppingCartBtn() {

  const [open, setOpen] = useState(false);
  const { cartQuantity } = useProductContext();
  const { loggedInCustomer } = useCustomerContext();

  const showShoppingCartDrawer = () => {
  setOpen(true);
  };

  const onClose = () => {
  setOpen(false);
  };


  return (
    <>
    <Badge count={cartQuantity}>
      <Button className="shopping--btn" type="text" onClick={showShoppingCartDrawer}>
        <ShoppingOutlined></ShoppingOutlined>
      </Button>
    </Badge>

    <Drawer title="Din Kundkorg" placement="right" onClose={onClose} open={open}>
      <ShoppingCart></ShoppingCart>

      {loggedInCustomer &&
        <CheckoutBtn></CheckoutBtn>
      }

      {!loggedInCustomer &&
        <>
        <p>
          Vill du slutföra ditt köp? <br />
          Vänligen logga in eller registrera dig.
        </p>
        <LogInBtn></LogInBtn>
        </>
      }
    </Drawer>
    </>
  )
}

export default ShoppingCartBtn