import React from 'react';
import { Form, Input, Button, Upload, Checkbox, Row, Col, Card } from 'antd';
import general from "./../assets/general.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Shipment = () => {

    const navigate = useNavigate()
    const onFinish = async (values) => {
        let userId = localStorage.getItem("loggedappUser")
        userId = JSON.parse(userId).id
        values.userId = userId
        values.shipmentStatus = "In Progress"
        try {
            const response = await axios.post(`http://localhost:3003/api/shipment/create`, values);
            if (response?.data?.shipment?.trackingNumber) {
                const trackingId = response?.data?.shipment?.trackingNumber
                navigate("/tracking/" + trackingId)
            }
        } catch (error) {
        }
    };

    const generateRandomTrackingNumber = () => {
        return Math.floor(Math.random() * 1000000000);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (
        <div style={{ padding: '20px', maxWidth: '45%', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Auction Shipment</h2>
            <Card>
                <Form name="shipmentForm" onFinish={onFinish}>
                    <Form.Item>
                        <Card>
                            <img style={{
                                height: '40vh',
                                width: '100%'
                            }} src={general} alt="Auction" />
                        </Card>
                    </Form.Item>

                    <Form.Item
                        name="shipmentTrackingNumber"
                        label="Tracking Number"
                        initialValue={generateRandomTrackingNumber()}
                    >
                        <Input placeholder="Auto-generated tracking number" disabled />
                    </Form.Item>

                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="yourName"
                                label="Your Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="yourPhoneNumber"
                                label="Your Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="yourEmail"
                                label="Your Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="shipmentCountry"
                                label="Country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the country!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter country" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="shipmentCity"
                                label="City"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the city!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter city" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="shipmentStreet"
                        label="Street Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the street address!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter street address" />
                    </Form.Item>

                    <Form.Item name="cashOnDelivery" valuePropName="checked">
                        <Checkbox checked disabled>Cash on Delivery</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit Shipment
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
