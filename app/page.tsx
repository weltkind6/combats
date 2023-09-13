"use client";
import { useState } from "react";
import styles from './page.module.css'

export default function Home() {
    const [userHp, setUserHp] = useState<number>(100);
    const [userDamage, setUserDamage] = useState<number>(0);

    const [computerHp, setComputerHp] = useState<number>(100);
    const [computerDamage, setComputerDamage] = useState<number>(0);

    console.log(userHp);
    console.log(computerHp);

    const damageHandler = () => {
        if (userHp <= 0 || computerHp <= 0) {
            return null;
        }
        const computerDamageCount = Math.floor(Math.random() * 100) + 1;
        setComputerDamage(computerDamageCount);
        const remainingUserHp = Math.max(userHp - computerDamageCount, 0);
        setUserHp(remainingUserHp);

        const userDamageCount = Math.floor(Math.random() * 100) + 1;
        setUserDamage(computerDamageCount);
        const remainingComputerHp = Math.max(computerHp - userDamageCount, 0);
        setComputerHp(remainingComputerHp);

    };

    return (
        <div className={styles.wrapper} style={{marginLeft: '400px', fontSize: '22px'}}>
            <div className={styles.player}>
               <div className={styles.panel}>
                   <div className={styles.hits}>
                       <h2>Удар</h2>
                       <label htmlFor="">
                           <span>Head</span>
                           <input type="radio" name="hit" id="hit_1" />
                       </label>
                       <label htmlFor="">
                           <span>Chest</span>
                           <input type="radio" name="hit" id="hit_2" />
                       </label>
                       <label htmlFor="">
                           <span>Legs</span>
                           <input type="radio" name="hit" id="hit_3" />
                       </label>
                   </div>
                   <div className={styles.blocks}>
                       <h2>Блок</h2>
                       <label htmlFor="">
                           <span>Head</span>
                           <input type="radio" name="block" id="block_1" />
                       </label>
                       <label htmlFor="">
                           <span>Chest</span>
                           <input type="radio" name="block" id="block_2" />
                       </label>
                       <label htmlFor="">
                           <span>Legs</span>
                           <input type="radio" name="block" id="block_3" />
                       </label>
                   </div>
               </div>
                <button onClick={damageHandler}>Hit!</button>
                <div>
                    <div>user HP : {userHp}</div>
                    <div>computer HP : {computerHp}</div>
                </div>
            </div>
        </div>
    );
}
