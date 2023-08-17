import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Divider } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import general from "./../assets/general.jpg"
import { Steps } from 'antd';

const { Step } = Steps;

export const TrackingOrder = () => {
    const [shipments, setShipments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchShipments() {
            try {
                const response = await axios.get('http://localhost:3003/api/shipment/get/' + id);
                setShipments(response?.data?.shipment);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        }

        fetchShipments();
    }, []);

    return (
        <div className="tracking-order-container">
            <Row justify="center">
                <Col span={16}>
                    {shipments && shipments.length > 0 ? shipments.map((shipment, index) => (
                        <TrackingOrderDetails key={index} shipment={shipment} />
                    ))
                        :
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <h6>No shipment placed yet...</h6>
                        </div>
                    }
                </Col>
            </Row>
        </div>
    );
};

export const TrackingOrderDetails = ({ shipment }) => {
    const statusSteps = [
        { status: 'Ordered', description: 'Your order has been placed.' },
        { status: 'In Progress', description: 'Your order is being prepared.' },
        { status: 'Confirmed', description: 'Your order has been confirmed and is ready for shipment.' },
        { status: 'On the Way', description: 'Your order is on its way to the delivery address.' },
        { status: 'Delayed', description: 'There may be a delay in the delivery.' },
        { status: 'Delivered', description: 'Your order has been successfully delivered.' },
    ];

    const getStatusIndex = (status) => {
        return statusSteps.findIndex(step => step.status === status);
    };

    return (
        <Card title="Tracking Order" className="tracking-order-card">
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <img style={{ height: '30vh' }} src={general} alt="Product" className="product-image" />
                </Col>
                <Col span={16}>
                    <h2>{shipment.name}</h2>
                    <p>Shipment Tracking Number: {shipment.trackingNumber}</p>
                    <p>Shipment Status: {shipment.shipmentStatus}</p>
                    <p>Name: {shipment.name}</p>
                    <p>Phone Number: {shipment.phoneNumber}</p>
                    <p>Email: {shipment.email}</p>
                    <p>Country: {shipment.country}</p>
                    <p>City: {shipment.city}</p>
                    <p>Street: {shipment.street}</p>
                    <p>Cash on Delivery: {'Yes'}</p>
                </Col>
            </Row>
            <Divider />
            <h3>Shipment Details</h3>
            <div className='p-3'>
                <Steps current={getStatusIndex(shipment.shipmentStatus)}>
                    {statusSteps.map(step => (
                        <Step key={step.status} title={step.status} description={step.description} />
                    ))}
                </Steps>
            </div>
        </Card>
    );
};
