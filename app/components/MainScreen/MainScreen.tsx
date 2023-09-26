import React from 'react';
import styles from './styles.module.css'
import Link from "next/link";

const MainScreen = () => {
    return (
        <div className={styles.wrapper}>
            <span><Link href={{pathname: "/blog"}}>Начать бой!</Link></span>
        </div>
    );
};

export default MainScreen;
