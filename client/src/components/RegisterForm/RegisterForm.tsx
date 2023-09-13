import { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import {
  useCustomerContext,
  newCustomerType,
} from "../../context/CustomerContext";

function RegisterForm() {

  const { handleRegisterNewCustomer, username, setUsername, email, setEmail, password, setPassword, alertInfo } = useCustomerContext();
  const [showAlert, setShowAlert] = useState(false);

  const handleRegisterSubmit = async () => {

    const newCustomer: newCustomerType = {
          username,
          email,
          password,
    };
    
    await handleRegisterNewCustomer(newCustomer)
    setShowAlert(true)
  };

  return (
    <>
    <p>Ny kund? Vänligen registrera dig här:</p>

    <br />
    {showAlert && (
        <Alert
          message={alertInfo}
          type="info"
          showIcon
          closable
          onClose={() => setShowAlert(false)}
        />
    )}
    <br />

    <Form
      name="register"
      className="register-form"
      initialValues={{ remember: true }}
    >

        <Form.Item
        name="email"
        rules={[{ required: true, message: "Du måste ange en e-mail" }]}>
            <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Din e-mailadress"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
        </Form.Item>

        <Form.Item
            name="username"
            rules={[{ required: true, message: "Du måste välja ett användarnamn" },]}>
            <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Välj ett användarnamn"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            />
        </Form.Item>

        <Form.Item
        name="password"
        rules={[{ required: true, message: "Du måste välja ett lösenord" }]}>
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Välj ett lösenord"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
        </Form.Item>

        <Form.Item>
            <Button
            type="primary"
            className="register-form-button"
            block
            style={{"backgroundColor":" #3C6255"}}
            onClick={handleRegisterSubmit}
            >
            Slutför
            </Button>
        </Form.Item>
    </Form>
    </>
    );
}

export default RegisterForm;