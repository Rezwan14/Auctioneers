import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, Button, Dropdown, Input } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const menu = () => {
    return (
        <Menu>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={() => {
                localStorage.clear();
                window.location.href = "/";
            }}>
                Logout
            </Menu.Item>
        </Menu>
    );
};

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate()
    const loggedUserJSON = window.localStorage.getItem("loggedappUser");
    useEffect(() => {
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            setIsLoggedIn(true);
        }
    }, [loggedUserJSON]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    const handleSearchClick = () => {
        navigate("tracking/" + searchValue)
    };

    return (
        <AntHeader>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="0" style={{ marginTop: '20px' }}>
                    <Link to="/"><h5>AUCTIONEERS</h5></Link>
                </Menu.Item>
                <span style={{ marginTop: '23px', marginRight: '50px' }}>
                    <h6>Welcome Back, {user?.firstName}</h6>
                </span>
                {
                    isLoggedIn ?
                        <>
                            <Menu.Item key="1" onClick={() => {
                                localStorage.removeItem("auctionDetails");
                                localStorage.removeItem("auctionId");
                                window.location.href = "/listing";
                            }}>
                                Listing
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => {
                                localStorage.removeItem("auctionDetails");
                                localStorage.removeItem("auctionId");
                                window.location.href = "/create";
                            }}>
                                Create
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => {
                                localStorage.removeItem("auctionDetails");
                                localStorage.removeItem("auctionId");
                                window.location.href = "/orders";
                            }}>
                                Orders
                            </Menu.Item>
                        </>
                        :
                        <>
                            <Menu.Item key="4">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/register">Register</Link>
                            </Menu.Item>
                        </>
                }
            </Menu>
            <div className="search-sticky" style={{
                position: 'absolute',
                top: 15,
                right: 0,
                alignItems: 'center',
                padding: '0 20px',
                backgroundColor: '#001529',
                width: "25%",
                display: 'flex',
                alignItems: 'center'
            }}>
                {isLoggedIn ?
                    <>
                        <Input
                            className='mr-4'
                            placeholder="Search for tracking order"
                            suffix={<SearchOutlined onClick={handleSearchClick} />}
                            onChange={handleSearchChange}
                        />
                        <Dropdown overlay={menu(isLoggedIn)} placement="bottomRight" arrow>
                            <Button icon={<UserOutlined />} type="text" style={{ color: 'white' }} />
                        </Dropdown>
                    </>
                    :
                    ""
                }
            </div>
        </AntHeader>
    );
};

export default Header;
