import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
  onLoginSuccess,
}) => {
  const handleLoginFormFinish = async () => {
    try {
      await handleLogin();
      onLoginSuccess();
    } catch (error) {
      console.log(error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Card style={{ width: 500, padding: 50 }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Log in to the Application</Title>
        </div>
        <br />
        <br />
        <Form onFinish={handleLoginFormFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter your username" },
              { min: 2, message: "Username must be at least 2 characters" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 3, message: "Password must be at least 3 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text type="secondary">
            Don't have an account?<Link to="/register"> Register now.</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
