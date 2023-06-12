import { CodeOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';

const btnStyle = {
    color: 'white',
};

const opts: Array<{
    type?: 'default' | 'link' | 'text' | 'ghost' | 'primary' | 'dashed';
    content: any;
    hint: string;
    key?: string;
    color?: string;
    action?: (...args) => void;
}> = [
    {
        content: <CodeOutlined rev />,
        hint: 'View code.',
        key: 'view-code',
		action: () => void console.log("cliquei view-code")
    },
];

export default function MyMenu() {
    return (
        <Space wrap>
            {opts.map(opt => (
                <Tooltip
                    title={opt.hint}
                    color={opt.color || '#8237f2'}
                    key={opt.key || undefined}
                >
                    <Button
                        type={opt.type || 'text'}
                        style={btnStyle}
                        onClick={opt.action}
                    >
                        {opt.content}
                    </Button>
                </Tooltip>
            ))}
        </Space>
    );
}
