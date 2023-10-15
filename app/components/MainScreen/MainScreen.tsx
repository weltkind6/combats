import React, {useState} from 'react';
import styles from './styles.module.scss'
import Link from "next/link";
import {Input} from "reactstrap";

const MainScreen = () => {
    const [name, setName] = useState('')

    return (
        <div className={styles.wrapper}>
            <div>
                <h3>Введите ваше имя:</h3>
                <Input type="text" className={styles.input} onChange={(e) => setName(e.target.value)}/>
            </div>
            <button>
                <Link href={{pathname: "/fight"}}>Начать бой!</Link>
            </button>
        </div>
    );
};

export default MainScreen;
