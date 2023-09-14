import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row, Button, Divider } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { useCustomerContext } from "../context/CustomerContext";
import { HomeOutlined } from "@ant-design/icons";

function confirmation() {

  const { verifyPayment, isPaymentVerified } = useCartContext();
  const { loggedInCustomer, email, setEmail } = useCustomerContext();


  useEffect (() => {
    verifyPayment()
    
    if (loggedInCustomer) {
      const email = loggedInCustomer.email;
      setEmail(email);
    }
  }, [])

  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh", "textAlign":"center", "marginTop":"1rem"}} span={24}>

          <NavLink to="/"style={{ textDecoration: "none" }}>
            <p className="link--my--pages"><HomeOutlined /> Till Startsidan</p>
          </NavLink> 

        {isPaymentVerified ? (
          <>
            <h3>Tack för din order!</h3>
            <h4>Information</h4>
            <Divider></Divider>
            <div>ORDER SYMBOL</div>
            <h1>Ditt köp har genomförts!</h1>
            <p>En bekräftelse kommer skickas till:</p>
            <p>{email}</p>
            <h4>Orderdetaljer</h4>
            <div>PLOCKA IN ORDERN HÄR!</div>
          </>
        ) : (
          <h3>Något gick fel med betalningen. Ditt köp gick inte igenom</h3>
        )}
          
          <NavLink to="/"style={{ textDecoration: "none" }}>
            <Button className="btn--text" style={{"backgroundColor":"#3C6255", "marginTop":"1.5rem", "borderRadius":"0", "color":"whitesmoke"}}>Fortsätt shoppa</Button>
          </NavLink>

        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default confirmation