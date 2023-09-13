"use client";
import { useState } from "react";
import styles from './page.module.css'

export default function Home() {
    const [userHp, setUserHp] = useState<number>(1000);
    const [userDamage, setUserDamage] = useState<number>(0);
    const [userBlock, setUserBlock] = useState<string>('')

    const [computerHp, setComputerHp] = useState<number>(1000);
    const [computerDamage, setComputerDamage] = useState<number>(0);
    const [computerHitName, setComputerHitName] = useState<string>('');


    const damageHandler = () => {
        // User HP (remains)
        if (userHp <= 0 || computerHp <= 0) {
            return null;
        }
        const computerDamageCount = Math.floor(Math.random() * 100) + 1;
        setComputerDamage(computerDamageCount);
        const remainingUserHp = Math.max(userHp - computerDamageCount, 0);

        // Random computer hit name
        const hitsList = ['head', 'chest', 'legs']
        const randomHitIndex = Math.floor(Math.random() * hitsList.length)
        const getRandomCompHit = hitsList[randomHitIndex]
        setComputerHitName(getRandomCompHit)

        // Computer HP (remains)
        const userDamageCount = Math.floor(Math.random() * 100) + 1;
        setUserDamage(computerDamageCount);
        const remainingComputerHp = Math.max(computerHp - userDamageCount, 0);
        setComputerHp(remainingComputerHp);

        // Comp hit vs player block
        if(userBlock === getRandomCompHit) {
            alert('Blocked successfully!')
        }
        else setUserHp(remainingUserHp);

        console.log('computerHitName', getRandomCompHit)
        console.log('userBlock', userBlock)
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
                           <input type="radio" name="block" id="block_1" onChange={() => setUserBlock('head')}/>
                       </label>
                       <label htmlFor="">
                           <span>Chest</span>
                           <input type="radio" name="block" id="block_2" onChange={() => setUserBlock('chest')}/>
                       </label>
                       <label htmlFor="">
                           <span>Legs</span>
                           <input type="radio" name="block" id="block_3" onChange={() => setUserBlock('legs')}/>
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
