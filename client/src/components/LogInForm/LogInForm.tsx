import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";
import {
  useCustomerContext,
  CustomerType,
} from "../../context/CustomerContext";

function LogInForm() {

  const { handleLogin } = useCustomerContext();

  const onFinish = async (values: any) => {
  
    const customer: CustomerType = {
          username: values.username,
          password: values.password,
        };

    await handleLogin(customer)
  };


  return (
    <>
      <p>Redan registrerad? Vänligen logga in här:</p>
      <br />
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish} 
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Du måste ange användarnamn" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="username"
            placeholder="Användarnamn..."
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Du måste ange lösenord" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Lösenord..."
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="login-form-button"
            htmlType="submit"
            block
            style={{"backgroundColor":" #3C6255"}}
          >
            Logga in
          </Button>
        </Form.Item>
      </Form>

      <br />
      <Divider />
      <br />
      <br />

    <p>Ny kund? Vänligen registrera dig här:</p>
    <br />
    <Form
      name="register"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={(values) => onFinish(values)}
    >
    <Form.Item
      name="username"
      rules={[
      { required: true, message: "Du måste välja ett användarnamn" },
      ]}
    >
      <Input
      prefix={<UserOutlined className="site-form-item-icon" />}
      placeholder="Välj ett användarnamn"
      />
    </Form.Item>

    <Form.Item
    name="email"
    rules={[{ required: true, message: "Du måste ange en e-mail" }]}
    >
      <Input
      prefix={<MailOutlined className="site-form-item-icon" />}
      placeholder="Din e-mailadress"
      />
  </Form.Item>

  <Form.Item
    name="password"
    rules={[{ required: true, message: "Du måste välja ett lösenord" }]}
  >
    <Input
      prefix={<LockOutlined className="site-form-item-icon" />}
      type="password"
      placeholder="Välj ett lösenord"
    />
  </Form.Item>

  <Form.Item>
    <Button
      type="primary"
      className="login-form-button"
      block
      style={{"backgroundColor":" #3C6255"}}
    >
      Slutför
    </Button>
  </Form.Item>
  </Form>
      </>
    );
  }


export default LogInForm;
