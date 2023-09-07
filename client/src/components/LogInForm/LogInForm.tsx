import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import { useState } from "react";
import { useCustomerContext, CustomerType } from '../../context/CustomerContext';

function LogInForm() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };

      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")
      const { loggedInCustomer, login } = useCustomerContext();
  
      const handleLogin = async (e: { preventDefault: () => void; }) => {
          e.preventDefault()
          const customer: CustomerType = {
              username,
              password
          }

          console.log(customer, "inloggad")
          
          // setUsername("");
          // setPassword("");
  
          await login(customer)   
      }
    
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
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLogin}>
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
  name="Förnamn och efternamn"
  rules={[{ required: true, message: 'För- och efternamn måste fyllas i' }]}
>
  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Förnamn och efternamn" />
</Form.Item>

<Form.Item
  name="Användarnamn"
  rules={[{ required: true, message: 'Användarnamn måste fyllas i' }]}
>
  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Användarnamn" />
</Form.Item>

<Form.Item
  name="Lösenord"
  rules={[{ required: true, message: 'Lösenord måste fyllas i' }]}
>
  <Input
    prefix={<LockOutlined className="site-form-item-icon" />}
    type="password"
    placeholder="Lösenord"
  />
</Form.Item>
<Form.Item>
  <Button type="primary" htmlType="submit" className="login-form-button">
    Submit
  </Button>
</Form.Item>
</Form>
</>
);
}

export default LogInForm
