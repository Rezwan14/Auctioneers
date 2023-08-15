import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Card, Divider, List, Avatar } from 'antd';
import { ParticipantsList } from './Participants';
import CountdownTimer from './CountDownTimer';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
const { Title, Text } = Typography;





const AuctionDetail = () => {
    const auctionDetails = localStorage.getItem("auctionDetails")
    let auctionObject = JSON.parse(auctionDetails)
    const [auction, setAuction] = useState(null)

    useEffect(() => {
        if (auctionObject && auction === null) setAuction(auctionObject)
    }, [auctionObject])


    const image_urls = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "https://www.oberlo.com/media/1603969900-productphotog-2.jpg?w=1824&fit=max",
        "https://image.shutterstock.com/image-photo/product-photography-relax-natural-beauty-260nw-1993589426.jpg",
        "https://www.borofone.com/wp-content/uploads/2022/04/borofone-bo12-power-bt-headset-headphones.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpXlBbrnemR6Kbq4Fk5Hj6LeoCYLIXpuIlA&usqp=CAU",
        "https://www.speakeragency.co.uk/media/h4shzgp0/387840464-690x460.jpg",
        "https://www.christies.com/media-library/images/features/articles/2021/08/11/misha-kahn-first-design-nft/misha-kahn-design-nft-group.jpg"
    ]



    return (
        <div >
            <Button style={{ marginTop: '10px', marginLeft: '30px' }} type='primary' onClick={() => {
                localStorage.clear()
                window.location.href = "/listing"
            }}>Back</Button>
            <Layout style={{ padding: '24px', marginTop: '20px', minHeight: '80vh' }}>

                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card style={{ height: '70vh' }}>
                            <div style={{ background: `url(${image_urls[0]}) center/cover`, height: '400px' }}></div>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text strong>Current Highest Bid:</Text>
                                    <Text>{auction?.currentBid}</Text>
                                </div>
                            </div>
                            <div className='mt-5' style={{ fontSize: '14px', color: '#999', textAlign: 'right' }}>
                                <Text strong>End Date & Time:</Text>
                                <br />
                                <Text>{moment(auction?.endDate).format("LLLL")}</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Card>
                            {auction?.endDate ?
                                <CountdownTimer endDate={auction?.endDate} />
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
