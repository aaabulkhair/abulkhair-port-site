import Image from 'next/image';
import React, { useContext } from 'react';
import { FaFolderOpen, FaUser } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { IoHomeSharp } from 'react-icons/io5';
import { MdPhone } from 'react-icons/md';
import { ThemeContext } from '../../contexts/theme-context';
import { headerData } from '../../data/header-data';
import styles from '../../styles/navbar.module.css';
import Link from '../link';

function Navbar() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="Ahmed Abulkhair Logo"
                        width={0}
                        height={0}
                        unoptimized={true}
                        className="cursor-pointer"
                        style={{ 
                            width: '80px',
                            height: 'auto',
                            filter: theme.isDark ? 'brightness(1)' : 'brightness(1)',
                        }}
                    />
                </Link>

                <div className={styles.desktopNav}>
                    <Link href="/" className={styles.navLink} style={{ color: '#ffffff' }}>
                        <IoHomeSharp className={styles.navIcon} />
                        <span>Home</span>
                    </Link>
                    
                    <Link href="/#about" className={styles.navLink} style={{ color: '#ffffff' }}>
                        <FaUser className={styles.navIcon} />
                        <span>About</span>
                    </Link>
                    
                    <Link href="/#resume" className={styles.navLink} style={{ color: '#ffffff' }}>
                        <HiDocumentText className={styles.navIcon} />
                        <span>Resume</span>
                    </Link>
                    
                    <Link href="/#blog" className={styles.navLink} style={{ color: '#ffffff' }}>
                        <FaFolderOpen className={styles.navIcon} />
                        <span>Blog</span>
                    </Link>
                    
                    <Link href="/#contacts" className={styles.navLink} style={{ color: '#ffffff' }}>
                        <MdPhone className={styles.navIcon} />
                        <span>Contact</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
