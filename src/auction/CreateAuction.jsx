import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

export const CreateAuction = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const loggedUserJSON = localStorage.getItem("loggedappUser")
        const user = JSON.parse(loggedUserJSON);
        values.userId = user.id
        try {
            const response = await axios.post('http://localhost:3003/api/items', values, {
                headers: {
                    Authorization: user.token
                }
            });
            if (response) {
                navigate('/listing');
            }
        } catch (error) {
            console.error('Error creating auction:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card style={{ width: '600px', padding: '24px' }}>
                <h2>Create Auction</h2>
                <Form
                    form={form}
                    name="createAuction"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item name="itemName" label="Item Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="startingBid" label="Starting Bid" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    {/* Add more fields as needed */}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Create Auction
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

