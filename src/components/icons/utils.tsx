import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { FunctionComponent } from 'react';

export function IconFactory(
    svg: FunctionComponent<CustomIconComponentProps>
): FunctionComponent<CustomIconComponentProps> {
    return (props: CustomIconComponentProps) => (
        // @ts-ignore
        <Icon component={() => svg(props)} {...props} />
    );
}

export const CONSTANTS = {
    primary: '#8237f2',
    darkPrimary: '#180037',
    veryDarkGrey: 'rgb(19 19 19)',
    darkGrey: '#363636',
    // darkGrey: '#4B4453',
    lightGrey: '#B1A8B9',
};
