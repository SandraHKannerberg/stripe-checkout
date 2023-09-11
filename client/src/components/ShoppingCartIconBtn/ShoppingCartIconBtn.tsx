import { Button, Drawer, Badge } from 'antd';
import { ShoppingOutlined, ShoppingFilled } from '@ant-design/icons';
import './ShoppingCartIconBtn.css'
import ShoppingCartContent from '../ShoppingCartContent/ShoppingCartContent';
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';
import LogInBtn from '../LogInBtn/LogInBtn';
import { useState } from "react";
import { useProductContext } from '../../context/ProductContext';
import { useCustomerContext } from '../../context/CustomerContext';

function ShoppingCartIconBtn() {

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
    <Badge count={cartQuantity} style={{"marginRight": "2.8rem", "backgroundColor":"inherit", "color": "#3C6255", "fontSize":"1.3rem"}}>
      <Button className="shopping--btn" type="text" onClick={showShoppingCartDrawer}>
        {cartQuantity === 0 &&
        <ShoppingOutlined></ShoppingOutlined>
        }

        {cartQuantity >= 1 &&
        <ShoppingFilled></ShoppingFilled>
        } 
      </Button>
    </Badge>

    <Drawer title="Din Kundkorg" placement="right" onClose={onClose} open={open}>
      <ShoppingCartContent></ShoppingCartContent>

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

export default ShoppingCartIconBtn