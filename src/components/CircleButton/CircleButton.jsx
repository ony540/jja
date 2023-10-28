/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow-circle.svg';
import { ReactComponent as MenuIcon } from '../../assets/images/menu-circle.svg';
import debounce from '../../utils/debounce';
import { useEffect, useState } from 'react';

export default function CircleButton({
    type = 'arrow',
    ariaLabel,
    onClick,
    color,
    styledCss,
}) {
    const theme = useTheme();
    const selectedColor = theme.colors[color];

    const [dynamicDiameter, setDynamicDiameter] = useState();

    const handleResize = debounce(() => {
        if (window.innerWidth < 1024) {
            setDynamicDiameter(44);
        } else {
            setDynamicDiameter(64);
        }
    }, 100);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            css={styledCss}
        >
            {type === 'arrow' ? (
                <ArrowIcon
                    color={selectedColor}
                    width={dynamicDiameter}
                    height={dynamicDiameter}
                />
            ) : (
                <MenuIcon
                    color={selectedColor}
                    width={dynamicDiameter}
                    height={dynamicDiameter}
                />
            )}
        </button>
    );
}
