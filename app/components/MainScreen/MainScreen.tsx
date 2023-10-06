import React from 'react';
import styles from './styles.module.css'
import Link from "next/link";

const MainScreen = () => {
    return (
        <div className={styles.wrapper}>
            <button>
                <Link href={{pathname: "/fight"}}>Начать бой!</Link>
            </button>
        </div>
    );
};

export default MainScreen;
