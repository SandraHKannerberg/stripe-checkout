import "./ConfirmationDetails.css"
import { Button, Divider } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { CheckOutlined } from "@ant-design/icons";
import "./Confirmation.css"


const { verifyPayment, isPaymentVerified } = useCartContext();
  //const { loggedInCustomer, email, setEmail } = useCustomerContext();

  useEffect (() => {
    verifyPayment()
    
    // if (loggedInCustomer) {
    //   const email = loggedInCustomer.email;
    //   setEmail(email);
    // }
  }, [])

function ConfirmationDetails() {
  return (
    <>

    {isPaymentVerified ? (
        <>
          <h3>Tack för din order!</h3>
          <h4>Information</h4>
          <Divider></Divider>
          <div className="order--check--icon"><CheckOutlined /></div>
          <h2>Ditt köp har genomförts!</h2>
          <p>En bekräftelse kommer skickas till din registrerade e-mailadress</p>
        </>
      ) : (
        <h3>Något gick fel med betalningen. Ditt köp gick inte igenom</h3>
      )}
        
        <NavLink to="/"style={{ textDecoration: "none" }}>
          <Button className="btn--text" style={{"backgroundColor":"#3C6255", "marginTop":"1.5rem", "borderRadius":"0", "color":"whitesmoke"}}>Fortsätt shoppa</Button>
        </NavLink>

    </>
  )
}

export default ConfirmationDetails