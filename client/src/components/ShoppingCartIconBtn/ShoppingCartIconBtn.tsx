import { Button, Drawer, Badge, Divider, Row } from 'antd';
import { ShoppingOutlined, ShoppingFilled } from '@ant-design/icons';
import './ShoppingCartIconBtn.css'
import ShoppingCartContent from '../ShoppingCartContent/ShoppingCartContent';
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';
import LogInBtn from '../LogInBtn/LogInBtn';
import Coupon from '../Coupon/Coupon';
import { useState } from "react";
import { useCartContext } from '../../context/CartContext';
import { useCustomerContext } from '../../context/CustomerContext';

function ShoppingCartIconBtn() {

  const [open, setOpen] = useState(false);
  const { cartQuantity } = useCartContext();
  const { loggedInCustomer } = useCustomerContext();

  const showShoppingCartDrawer = () => {
  setOpen(true);
  };

  const onClose = () => {
  setOpen(false);
  };


  return (
    <>
    <Badge count={cartQuantity} style={{"marginRight": "2.8rem", "backgroundColor":"#EAE7B1", "color": "#3C6255", "fontSize":"1.1rem"}}>
      <Button className="shopping--btn" type="text" onClick={showShoppingCartDrawer}>
        {cartQuantity === 0 &&
        <ShoppingOutlined></ShoppingOutlined>
        }

        {cartQuantity >= 1 &&
        <ShoppingFilled></ShoppingFilled>
        } 
      </Button>
    </Badge>

    <Drawer title="Din Kundkorg" placement="right" onClose={onClose} open={open} style={{"backgroundImage": "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)", "color":"#3C6255"}}>

      {loggedInCustomer && cartQuantity !== 0 &&
      <>
        <ShoppingCartContent></ShoppingCartContent>
        <CheckoutBtn></CheckoutBtn>
        <Row justify="center" align="middle" style={{"backgroundColor" : "black", "height" : "5rem", "marginTop":"0.5rem"}}>
          <Coupon></Coupon>
        </Row>
      </>
      }

      {cartQuantity === 0 &&
        <p>Du har inte börjat shoppa än</p>
      }

      {!loggedInCustomer &&
        <>
        <br />
        <Divider></Divider>
        <p className="text--cart">
          Vill du slutföra ditt köp? <br />
          Vänligen logga in som registrerad kund eller registrera dig om du är ny kund hos oss.
        </p>
        <LogInBtn></LogInBtn>
        </>
      }
    </Drawer>
    </>
  )
}

export default ShoppingCartIconBtn