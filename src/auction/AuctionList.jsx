import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Divider, Spin } from 'antd'; // Import Spin
import axios from 'axios';
import moment from 'moment/moment';
// import auctionImg from "./assets/download.JFIF"
import AuctionDetail from './AuctionDetails';
import itemService from "../services/items";

const { Title } = Typography;

const AuctionList = () => {
    const [items, setItems] = useState([]);

    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuctionDetailPage, setIsAuctionDetailpage] = useState(null)
    const url = window.location.href

    function getAuctionIdFromUrl(url) {
        const parts = url.split('/');
        const auctionId = parts[parts.length - 1];
        if (auctionId !== "listing")
            localStorage.setItem("auctionId", auctionId)
    }

    const localStorageAuctionid = localStorage.getItem("auctionId")

    useEffect(() => {
        getAuctionIdFromUrl(url);

        if (localStorageAuctionid) setIsAuctionDetailpage(localStorageAuctionid)
    }, [localStorageAuctionid])

    useEffect(() => {
        itemService.getAll().then((items) => {
            setAuctions(items)
            setLoading(false);
        });
        // axios.get('http://localhost:3000/api/auction/my', {
        //     headers: {
        //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDI5MThkM2RlOThlZjNlNzNmYzIxZiIsImlhdCI6MTY5MTg3MjI2NiwiZXhwIjoxNjkxOTA4MjY2fQ.viPjMQj3awafBjGhFtlLeZg6aA21rWHT64gc472CZmw'
        //     }
        // })
        //     .then(response => {
        //         setAuctions(response.data.data);
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         setError(error);
        //         setLoading(false);
        //     });
    }, []);

    if (loading) {
        return (
            <div className="spinner-container" style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Spin size="large" /> {/* Display a spinner */}
            </div>
        );
    }

    if (error) {
        return <div className="" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h3>Error: {error.message}</h3>;
        </div>
    }

    const handleCardClick = (auction) => {
        localStorage.setItem("auctionDetails", JSON.stringify(auction))
        window.location.href = `/listing/${auction.id}`
    };

    const image_urls = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "https://image.shutterstock.com/image-photo/product-photography-relax-natural-beauty-260nw-1993589426.jpg",
        "https://www.speakeragency.co.uk/media/h4shzgp0/387840464-690x460.jpg",
        "https://www.borofone.com/wp-content/uploads/2022/04/borofone-bo12-power-bt-headset-headphones.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpXlBbrnemR6Kbq4Fk5Hj6LeoCYLIXpuIlA&usqp=CAU",
        "https://www.christies.com/media-library/images/features/articles/2021/08/11/misha-kahn-first-design-nft/misha-kahn-design-nft-group.jpg",
        "https://www.oberlo.com/media/1603969900-productphotog-2.jpg?w=1824&fit=max"
    ]


    return (
        <>

            {
                isAuctionDetailPage ? <AuctionDetail />
                    :
                    <div className='' style={{ padding: '24px', marginTop: '10px' }}>
                        <Title level={2}>Auction List</Title>
                        <Divider />
                        <Row gutter={[16, 16]} className='p-2'>
                            {auctions && auctions.length > 0 ? auctions.map((auction, index) => (
                                <Col xs={24} sm={12} md={6} lg={6} xl={6} key={auction.id} className='p-2 '>
                                    <Card
                                        style={{ height: '380px' }}
                                        hoverable
                                        onClick={() => handleCardClick(auction)}
                                    >
                                        <div style={{
                                            background: '#6fb9ff',
                                            padding: '60px',
                                            textAlign: 'center',
                                            borderRadius: '10px',
                                            height: '180px'
                                        }}>
                                            <h4>{auction.itemName.substr(0, 20) + "..."}</h4>
                                        </div>
                                        <div className='mt-2 '>
                                            <h6 className='mt-1'>By: {auction?.user.lastName}</h6>
                                            <p>{auction.description.substr(0, 40) + "..."}</p>
                                        </div>
                                        <p>Category:{auction.category}</p>
                                        <div className='mt-2 mb-0' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h6>Starting Bid: {auction.startingBid}</h6>
                                            <h6 >Current Bid: {auction.currentBid}</h6>
                                        </div>
                                        <p style={{ fontSize: '12px' }}>End Date & time: {moment(auction.endDate).format("LLLL")}</p>
                                    </Card>
                                </Col>
                            ))
                                :
                                <h5>No data available...</h5>
                            }
                        </Row>
                    </div>
            }
        </>
    );
};

export default AuctionList;
