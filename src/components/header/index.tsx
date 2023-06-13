import { Col, Layout, Row } from 'antd';
import React from 'react';

import GameTitle from '~components/gameTitle';
import { CONSTANTS } from '~components/icons/utils';
import MyMenu from '~components/menu';

import { SpecterLogoIcon } from '../icons';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minWidth: '100vw',
    height: '62px',
    padding: '10px',
    color: CONSTANTS.lightGrey,
    backgroundColor: CONSTANTS.veryDarkGrey,
};

const logoContainerStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default function MyHeader() {
    return (
        <Header style={headerStyle}>
            <Row style={{ width: '100%' }} align="middle">
                <Col span={2} style={logoContainerStyle}>
                    <SpecterLogoIcon
                        width="40px"
                        height="40px"
                        fill={"white"}
                    ></SpecterLogoIcon>
                </Col>
                <Col
                    span={22}
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
