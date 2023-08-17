import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Card, Divider, List, Avatar } from 'antd';
import { ParticipantsList } from './Participants';
import CountdownTimer from './CountDownTimer';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import general from "./../assets/general.jpg"
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;





const AuctionDetail = () => {
    const auctionDetails = localStorage.getItem("auctionDetails")
    let auctionObject = JSON.parse(auctionDetails)
    const [auction, setAuction] = useState(null)

    useEffect(() => {
        if (auctionObject && auction === null) setAuction(auctionObject)
    }, [auctionObject])


    const today = moment();
    const endOfDay = today.endOf('day');
    const formattedEndOfDay = endOfDay.format('YYYY-MM-DD HH:mm:ss');


    return (
        <div >
            <Button style={{ marginTop: '10px', marginLeft: '30px' }} type='primary' onClick={() => {
                localStorage.removeItem("auctionDetails")
                localStorage.removeItem("auctionId")
                window.location.href = "/listing"
            }}>Back</Button>
            <Layout style={{ padding: '24px', marginTop: '20px', minHeight: '80vh' }}>

                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card style={{ height: '70vh' }}>
                            <div style={{ background: `url(${general}) center/cover`, height: '400px', borderRadius: '10px' }}></div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card
                            style={{
                                height: '70vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: '20px',
                            }}
                        >
                            <div>
                                <Title level={2} style={{ color: '#1890ff', marginBottom: '4px' }}>
                                    {auction?.itemName}
                                </Title>
                                <Text type="secondary" style={{ marginBottom: '16px' }}>
                                    {auction?.category}
                                </Text>
                                <p>{auction?.description}</p>
                                <Divider />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text strong>Starting Bid:</Text>
                                    <Text>{auction?.startingBid}</Text>
                                </div>
                                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text strong>Current Highest Bid:</Text>
                                    <Text>{auction?.currentBid}</Text>
                                </div> */}
                            </div>
                            <div className='mt-5' style={{ fontSize: '14px', color: '#999', textAlign: 'right' }}>
                                <Text strong>End Date & Time:</Text>
                                <br />
                                <Text>{moment(formattedEndOfDay).format("LLLL")}</Text>
                            </div>

                            <div className='d-flex justify-content-center' style={{ marginTop: '50%' }}>
                                <Link to="/shipment">
                                    <Button style={{ width: '200px' }} type="primary" >
                                        Place Order</Button>
                                </Link>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card>
                            {formattedEndOfDay ?
                                <CountdownTimer endDate={formattedEndOfDay} />
                                :
                                "End Date and Time missing"}
                        </Card>
                        <Card style={{ marginTop: '24px', height: '58vh' }}>
                            <Title level={4}>Participants</Title>
                            <ParticipantsList auctionId={auction?.id} />
                        </Card>
                    </Col>
                </Row>
            </Layout>
        </div >
    );
};

export default AuctionDetail;
