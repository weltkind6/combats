import React from 'react';
import styles from './styles.module.css'
import Link from "next/link";

const MainScreen = () => {
    return (
        <div className={styles.wrapper}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <Link href={{pathname: "/fight"}}>Начать бой!</Link>
            </button>
        </div>
    );
};

export default MainScreen;
