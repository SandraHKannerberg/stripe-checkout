import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

function LogInForm() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };
    
      return (
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
              Logga in
            </Button>
          </Form.Item>
        </Form>
      );
}

export default LogInForm
