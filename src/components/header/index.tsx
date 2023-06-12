import { Col, Layout, Row } from 'antd';
import specterLogo from 'data-base64:~assets/icon512.png';
import React from 'react';

import GameTitle from '~components/gameTitle';
import MyMenu from '~components/menu';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minWidth: '100vw',
    color: 'white',
    height: '62px',
};

const logoContainerStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const logoStyle: React.CSSProperties = {
    maxWidth: '32px',
    maxHeight: '32px',
    margin: 'auto',
};

export default function MyHeader() {
    return (
        <Header style={headerStyle}>
            <Row style={{ width: '100%' }}>
                <Col span={3} style={logoContainerStyle}>
                    <img
                        style={logoStyle}
                        src={specterLogo}
                        alt="Specter Logo"
                    />
                </Col>
                <Col
                    span={21}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <GameTitle></GameTitle>
                    <MyMenu></MyMenu>
                </Col>
            </Row>
        </Header>
    );
}
