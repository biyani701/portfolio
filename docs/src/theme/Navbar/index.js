import React from 'react';
import Navbar from '@theme-original/Navbar';
import ThemeToggle from '../../components/ThemeToggle';
import styles from './styles.module.css';

export default function NavbarWrapper(props) {
  return (
    <div className={styles.navbarWrapper}>
      <Navbar {...props} />
      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>
    </div>
  );
}
