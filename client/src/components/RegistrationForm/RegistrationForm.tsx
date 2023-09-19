import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import {
  useCustomerContext,
  newCustomerType,
} from "../../context/CustomerContext";
import { useEffect } from "react";
import "../LogInForm/LogInForm.css"

const { Text } = Typography;

function RegistrationForm() {

  const { handleRegistrationNewCustomer, username, setUsername, email, setEmail, password, setPassword, successInfo, setSuccessInfo, errorInfo, setErrorInfo } = useCustomerContext();
  
  useEffect(() => {
    if (successInfo !== "") {
      setTimeout(() => {
        setSuccessInfo("");
      }, 5000);
    }
  }, [successInfo]);

  useEffect(() => {
    if (errorInfo !== "") {
      setTimeout(() => {
        setErrorInfo("");
      }, 5000);
    }
  }, [errorInfo]);


  const handleRegistrationSubmit = async () => {

    const newCustomer: newCustomerType = {
          username,
          email,
          password,
    };
    
    await handleRegistrationNewCustomer(newCustomer)

  };

  return (
    <>
    <p>Ny kund? Vänligen registrera dig här:</p>

    <br />
    <Text type="success">{successInfo}</Text>
    <br />
    <br />

    <Form
      name="registration"
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
            className="drawer--button"
            block
            style={{"backgroundColor":" #3C6255", "borderRadius":"0",}}
            onClick={handleRegistrationSubmit}
            >
            <p className="btn--text">Slutför</p>
            </Button>
        </Form.Item>

        <Text type="danger">{errorInfo}</Text>
    </Form>
    </>
    );
}

export default RegistrationForm;