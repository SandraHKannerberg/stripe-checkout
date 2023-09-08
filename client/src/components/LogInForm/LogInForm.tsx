import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";
import { useState } from "react";
import {
  useCustomerContext,
  CustomerType,
} from "../../context/CustomerContext";

function LogInForm() {

  const { username, setUsername, password, setPassword, isLoggedIn, handleLogin } = useCustomerContext();

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);

    const customer: CustomerType = {
          username: values.username,
          password: values.password,
        };

    console.log(customer)

    await handleLogin(customer)

  };


  return (
    <>
      <p>Already a customer? Please log in here</p>


      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish} 
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="username"
            placeholder="Enter username"
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
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="login-form-button"
            htmlType="submit"
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      {/*<p>New customer? Please register here</p>

      <Form
        name="register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values, "register")}
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
        </Form>*/}
    </>
  );
}

export default LogInForm;
