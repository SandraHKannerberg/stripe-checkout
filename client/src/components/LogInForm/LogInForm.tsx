import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';

function LogInForm() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };
    
      return (
        <>
        <p>Redan medlem? Logga in här</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
              Logga In
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <p>Ny medlem? Registrera dig här</p>

<Form
name="normal_login"
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
    Bli Medlem
  </Button>
</Form.Item>
</Form>
</>
);
}

export default LogInForm
