import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios';

export const OrderList = () => {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        async function fetchShipments() {
            try {
                const response = await axios.get('http://localhost:3003/api/shipment/getall');
                setShipments(response?.data?.shipment);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        }

        fetchShipments();
    }, []);

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tracking Number',
            dataIndex: 'trackingNumber',
            key: 'trackingNumber',
        },
        {
            title: 'Shipment Status',
            dataIndex: 'shipmentStatus',
            key: 'shipmentStatus',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    {/* Add any action buttons you want here */}
                    <a href={`/tracking/${record.trackingNumber}`}>View Details</a>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={shipments}
            columns={columns}
            rowKey="_id"
            pagination={false}
        />
    );
};
