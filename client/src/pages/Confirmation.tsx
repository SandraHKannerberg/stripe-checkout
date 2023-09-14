import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row, Button, Divider } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useCartContext } from "../context/CartContext";

function confirmation() {

  const { verifyPayment, isPaymentVerified } = useCartContext();

  useEffect (() => {
    verifyPayment()
  }, [])

  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh", "textAlign":"center", "marginTop":"1rem"}} span={24}>

        {isPaymentVerified ? (
          <>
            <h3>Tack för din order!</h3>
            <h4>Information</h4>
            <Divider></Divider>
            <div>ORDER SYMBOL</div>
            <h1>Ditt köp har genomförts!</h1>
            <p>En bekräftelse kommer skickas till:</p>
            <p>KUNDENS MAIL</p>
            <h4>Orderdetaljer</h4>
            <div>PLOCKA IN ORDERN HÄR!</div>
          </>
        ) : (
          <h3>Något gick fel med betalningen. Ditt köp gick inte igenom</h3>
        )}
          
          <NavLink to="/"style={{ textDecoration: "none" }}>
            <Button style={{"backgroundColor":"#3C6255", "marginTop":"1.5rem", "borderRadius":"0", "color":"whitesmoke"}}>TILLBAKA TILL BUTIKEN</Button>
          </NavLink>

        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default confirmation