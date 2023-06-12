import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, Layout } from 'antd';
import antdResetCssText from 'data-text:antd/dist/reset.css';
import type { PlasmoCSConfig, PlasmoGetShadowHostId } from 'plasmo';
import type { FC } from 'react';

import MyHeader from '~components/header';
import { commonConfig } from '~utils/config';

import theme from './theme';

// ____ ____ ___ _  _ ___  
// [__  |___  |  |  | |__] 
// ___] |___  |  |__| |    

const HOST_ID = 'dashingdon-specter-a3a34a0b-2196-4f61-8424-7e91e4899eda';

// ____ ____ _  _ ___  ____ _  _ ____ _  _ ___ 
// |    |  | |\/| |__] |  | |\ | |___ |\ |  |  
// |___ |__| |  | |    |__| | \| |___ | \|  |  

export const Component = (() => (
    <ConfigProvider theme={theme}>
        <StyleProvider container={document.getElementById(HOST_ID).shadowRoot}>
            <Layout style={{ minWidth: '100vw' }}>
                <MyHeader></MyHeader>
            </Layout>
        </StyleProvider>
    </ConfigProvider>
)) as FC;

// ____ _  _ ___  ____ ____ ___ ____ 
// |___  \/  |__] |  | |__/  |  [__  
// |___ _/\_ |    |__| |  \  |  ___] 

export const config: PlasmoCSConfig = {
    ...commonConfig,
    world: 'MAIN',
};

export const getShadowHostId: PlasmoGetShadowHostId = () => HOST_ID;

export const getStyle = () => {
    const style = document.createElement('style');
    style.textContent = antdResetCssText;
    return style;
};
