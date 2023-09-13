import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function confirmation() {

  const [isPaymentVerified, setIsPaymentverified] = useState(false);

  const verifyPayment = async () => {

    try {
      const sessionId = localStorage.getItem("session-id")

      const response = await fetch("/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionId)
        })

        const {verified} = await response.json()

        if (verified) {
          setIsPaymentverified(true)
          localStorage.removeItem("session-id") //Detta behöver vi inte längre och kan därför tas bort när allt är verifierat
        } else {
          setIsPaymentverified(false)
        }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (() => {
    verifyPayment()
  }, [])

  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh", "textAlign":"center"}} span={24}>

        {isPaymentVerified ? (
          <h3>Tack för ditt köp!</h3>
        ) : (
          <h3>Något gick fel med betalningen. Ditt köp gick inte igenom</h3>
        )}
          
          <NavLink to="/"style={{ textDecoration: "none" }}>
            <p>TILLBAKA TILL BUTIKEN</p>
          </NavLink>

        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default confirmation