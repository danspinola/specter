import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

const MAX_LENGTH = 25;

const titleStyle = (title: boolean = false) => ({
    color: 'white',
    fontSize: '1rem',
    display: 'block',
    paddingBlock: '0.2rem',
    lineHeight: '1rem',
    fontWeight: title ? 'bold' : '200',
    // textOverflow: "ellipsis",
    // maxWidth: "16px",
});

export default function GameTitle() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const scrappedTitle =
            (
                document.querySelector(
                    '#header h1.gameTitle'
                ) as HTMLHeadingElement
            )?.innerText.trim() || '';

        setTitle(scrappedTitle);
        // setTitle('1234567890XXX1234567890');

        let scrappedAuthor =
            (document.querySelector('#header h2#author') as HTMLHeadingElement)
                ?.innerText || '';

        scrappedAuthor = (scrappedAuthor.split('by ')[1] || '').trim();

        setAuthor(scrappedAuthor);
    }, []);

    const getTitleComponent = () => {
        if (title.length > MAX_LENGTH) {
            return (
                <Tooltip title={title} color={'#8237f2'}>
                    <span style={titleStyle(true)}>
                        {title.slice(0, MAX_LENGTH) + '…'}
                    </span>
                </Tooltip>
            );
        }
        return <span style={titleStyle(true)}>{title}</span>;
    };

    return (
        <p style={{ marginBlock: 'auto' }}>
            {getTitleComponent()}
            <span style={titleStyle()}>{author}</span>
        </p>
    );
}
