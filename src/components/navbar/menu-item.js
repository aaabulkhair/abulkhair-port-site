import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import Link from '../link';
import styles from '../../styles/menu-item.module.css';

function MenuItem({ icon: Icon, label, href, onClick, isActive = false, isThemeToggle = false }) {
    const { theme, isDark } = useContext(ThemeContext);

    const itemStyles = {
        '--primary': theme.primary,
        '--primary-rgb': theme.primaryRgb,
        '--secondary': theme.secondary,
        '--secondary-rgb': theme.secondaryRgb,
        '--tertiary': theme.tertiary,
        '--tertiary-rgb': theme.tertiaryRgb,
        '--quaternary': theme.quaternary,
        '--quaternary-rgb': theme.quaternaryRgb,
        '--quaternary-light': theme.quaternaryLight,
    };

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    const content = (
        <div 
            className={`${styles.menuItem} ${isActive ? styles.active : ''} ${isThemeToggle ? styles.themeToggle : ''}`}
            style={itemStyles}
            onClick={handleClick}
        >
            <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
            </div>
            <span className={styles.label}>{label}</span>
            <div className={styles.glow}></div>
        </div>
    );

    if (href && !onClick) {
        return (
            <Link href={href}>
                {content}
            </Link>
        );
    }

    return content;
}

export default MenuItem;