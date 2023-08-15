import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, Button, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link for navigation

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const menu = () => {
    return (
        <Menu>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={() => {
                localStorage.clear()
                window.location.href = "/"
            }}>
                Logout
            </Menu.Item>
        </Menu>
    )
}

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);

    const loggedUserJSON = window.localStorage.getItem("loggedappUser");
    useEffect(() => {
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            setIsLoggedIn(true);
        }
    }, [loggedUserJSON]);
    return (
        <AntHeader>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="0">
                    <Link to="/">AUCTIONEERS</Link>
                </Menu.Item>
                {
                    isLoggedIn ?
                        <>
                            <Menu.Item key="1">
                                <Link to="/listing">Listing</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                Welcome Back, {user?.firstName}
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Dropdown overlay={menu(isLoggedIn)} placement="bottomRight" arrow>
                                    <Button icon={<UserOutlined />} type="text" style={{ color: 'white' }} />
                                </Dropdown>
                            </Menu.Item></>
                        :
                        <>
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserAddOutlined />}>
                                <Link to="/register">Register</Link>
                            </Menu.Item>
                        </>
                }
            </Menu>
        </AntHeader>
    );
};

export default Header;
