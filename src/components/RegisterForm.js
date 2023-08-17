import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Button,
  Typography,
  DatePicker,
  Select,
  Card,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

const RegisterForm = ({ handleRegister }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleRegister(values);
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "600px",
          marginTop: "200px",
          marginBottom: "30px",
        }}
      >
        <Card style={{ width: 600, padding: 30 }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
            Register for an Account
          </Title>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label="First Name" name="firstName">
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker style={{ width: "100%" }} placeholder="Birthday" />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Select placeholder="Select a country">
                <Option value="us">United States</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="ca">Canada</Option>
                {/* Add more countries */}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <br />
    </div>
  );
};

RegisterForm.propTypes = {
  handleRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
