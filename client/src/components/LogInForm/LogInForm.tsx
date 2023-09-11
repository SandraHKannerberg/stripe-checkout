import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";
import {
  useCustomerContext,
  CustomerType,
} from "../../context/CustomerContext";

function LogInForm() {

  const { loggedInCustomer, handleLogin } = useCustomerContext();

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

      {loggedInCustomer ? (
            
          <div>
            <p className='messageDiv'>Du är inloggad som: {loggedInCustomer.username}</p>
          </div>
     
          ) : (

          <div>

            <p>Redan registrerad? Vänligen logga in här:</p>

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
                >
                  Logga in
                </Button>
              </Form.Item>
            </Form>

            <Divider />

          <p>Ny kund? Vänligen registrera dig här:</p>

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
            prefix={<UserOutlined className="site-form-item-icon" />}
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
          >
            Slutför
          </Button>
        </Form.Item>
        </Form>
      </div>

        )}
      </>
    );
  }


export default LogInForm;
