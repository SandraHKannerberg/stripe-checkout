import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import {
  useCustomerContext,
  CustomerType,
} from "../../context/CustomerContext";
import { useEffect } from "react";

const { Text } = Typography;

function LogInForm() {

  const { authorization, handleLogin, errorLogin, setErrorLogin } = useCustomerContext();
  const [form] = Form.useForm();

  const handleLoginFinish = async (values: any) => {
  
    const customer: CustomerType = {
          username: values.username,
          password: values.password,
        };

    await handleLogin(customer)
    authorization()

    form.resetFields(); //Reset inputs after login
  };

  useEffect(() => {
    if (errorLogin !== "") {
      setTimeout(() => {
        setErrorLogin("");
      }, 5000);
    }
  }, [errorLogin]);


  return (
    <>
      <p>Redan registrerad? Vänligen logga in här:</p>
      <br />
      <Form
        form={form}
        name="login"
        className="login-form"
        onFinish={handleLoginFinish} 
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
            className="login--form--button"
            htmlType="submit"
            block
            style={{"backgroundColor":" #3C6255", "borderRadius": "0"}}
          >
            <p className="btn--text">Logga in</p>
          </Button>
        </Form.Item>

        <Text type="danger">{errorLogin}</Text>
      </Form>
      </>
    );
  }


export default LogInForm;
