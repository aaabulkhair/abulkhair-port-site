import React, { useContext } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { ThemeContext } from '../../contexts/theme-context';
import styles from '../../styles/theme-toggle.module.css';

function ThemeToggle() {
    const { theme, changeTheme, isDark } = useContext(ThemeContext);

    const toggleStyles = {
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

    return (
        <div 
            className={styles.themeToggleContainer}
            style={toggleStyles}
            onClick={changeTheme}
        >
            <div className={styles.toggleTrack}>
                <div className={`${styles.toggleSlider} ${isDark ? styles.dark : styles.light}`}>
                    <div className={styles.iconWrapper}>
                        {isDark ? (
                            <BsFillMoonFill className={styles.icon} />
                        ) : (
                            <BsFillSunFill className={styles.icon} />
                        )}
                    </div>
                </div>
                
                <div className={styles.trackIcons}>
                    <div className={`${styles.trackIcon} ${styles.leftIcon} ${!isDark ? styles.active : ''}`}>
                        <BsFillSunFill />
                    </div>
                    <div className={`${styles.trackIcon} ${styles.rightIcon} ${isDark ? styles.active : ''}`}>
                        <BsFillMoonFill />
                    </div>
                </div>
            </div>
            
            <span className={styles.label}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
        </div>
    );
}

export default ThemeToggle;