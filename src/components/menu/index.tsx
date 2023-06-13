import { Button, type ButtonProps, Space } from 'antd';
import React from 'react';

import { CodeIcon } from '~components/icons';
import { CONSTANTS } from '~components/icons/utils';

type TOption = {
    content: any;
    props: ButtonProps;
    key: string;
};

const btnStyle = {
    color: 'white',
};

const spaceStyle = {
    display: 'flex',
    alignItems: 'center',
};

const opts: TOption[] = [
    {
        content: (
            <CodeIcon
                width="1.5rem"
                height="1.5rem"
                fill={CONSTANTS.lightGrey}
            />
        ),
        props: {
            type: 'text',
            onClick: () => void console.log('cliquei view-code'),
        },
        key: 'view-code',
    },
];

export default function MyMenu() {
    return (
        <Space style={spaceStyle} wrap>
            {opts.map(opt => (
                <Button key={opt.key} style={btnStyle} {...opt.props}>
                    {opt.content}
                </Button>
            ))}
        </Space>
    );
}
