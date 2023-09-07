import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";
import { useState } from "react";
import {
  useCustomerContext,
  CustomerType,
} from "../../context/CustomerContext";

function LogInForm() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInCustomer, login } = useCustomerContext();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const customer: CustomerType = {
      username,
      password,
    };

    await login(customer);

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <p>Already a customer? Please log in here</p>
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="login-form-button"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <p>New customer? Please register here</p>

      <Form
        name="register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Username is required" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Choose a username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "E-mail is required" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your e-mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Choose a password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LogInForm;
