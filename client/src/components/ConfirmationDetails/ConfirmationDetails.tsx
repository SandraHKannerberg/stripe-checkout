import "./ConfirmationDetails.css"
import { Button, Card, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { CheckOutlined } from "@ant-design/icons";
import "./ConfirmationDetails.css"


function ConfirmationDetails() {

  const { verifyPayment, isPaymentVerified } = useCartContext();

  useEffect (() => {
    verifyPayment()
  }, [])

  return (

    <Space direction="vertical" size={16}>
 
    {isPaymentVerified ? ( 
    
    <Card title="Tack för din order" style={{ width: 300, display: "flex", flexDirection:"column", gap: "2rem" }}>
      <div className="order--check--icon"><CheckOutlined /></div>
      <h3>Ditt köp har genomförts!</h3>
      <p className="order--confirmation--text">En bekräftelse kommer skickas till din registrerade e-mailadress</p>
    </Card>
    
    ) : (
      <h3>Något gick fel med betalningen. Ditt köp gick inte igenom</h3>
    )}
    
    <NavLink to="/"style={{ textDecoration: "none" }}>
      <Button className="btn--text" style={{"backgroundColor":"#3C6255", "marginTop":"1.5rem", "borderRadius":"0", "color":"whitesmoke"}}>Fortsätt shoppa</Button>
      </NavLink>
    </Space>
    
  )
}

export default ConfirmationDetails