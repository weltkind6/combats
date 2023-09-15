"use client"
import { useState } from "react";
import styles from './page.module.css'

export default function Home() {
    const [userHp, setUserHp] = useState<number>(1000);
    const [userDamage, setUserDamage] = useState<number>(0);
    const [userHitName, setUserHitName] = useState<string>('');
    const [userBlockName, setUserBlockName] = useState<string>('');
    const [isBlockChecked, setIsBlockChecked] = useState<boolean>(false);
    console.log(isBlockChecked)

    const [computerHp, setComputerHp] = useState<number>(1000);
    const [computerDamage, setComputerDamage] = useState<number>(0);
    const [computerHitName, setComputerHitName] = useState<string>('');
    const [computerBlock, setComputerBlock] = useState<string>('');

    const damageHandler = () => {
        // User HP (remains)
        if (userHp <= 0 || computerHp <= 0) {
            return null;
        }
        const computerDamageCount = Math.floor(Math.random() * 100) + 1;
        setComputerDamage(computerDamageCount);
        const remainingUserHp = Math.max(userHp - computerDamageCount, 0);

        // Random computer hit + block name
        const hitsList = ['head', 'chest', 'legs']
        const randomHitIndex = Math.floor(Math.random() * hitsList.length)
        const randomBlockIndex = Math.floor(Math.random() * hitsList.length)
        const getRandomCompHit = hitsList[randomHitIndex]
        const getRandomCompBlock = hitsList[randomBlockIndex]
        setComputerBlock(getRandomCompBlock)
        setComputerHitName(getRandomCompHit)

        // Computer HP (remains)
        const userDamageCount = Math.floor(Math.random() * 100) + 1;
        setUserDamage(computerDamageCount);
        const remainingComputerHp = Math.max(computerHp - userDamageCount, 0);

        // Comp hit vs player block
        if (userBlockName === getRandomCompHit) {
            console.log('User blocked successfully!')
            return userHp
        } else setUserHp(remainingUserHp);

        // User hit vs comp block
        if (computerBlock === userHitName) {
            console.log('Comp blocked successfully!')
            return computerHp
        }
        setComputerHp(remainingComputerHp);

        // Reset checkboxes
        setUserHitName('');
        setUserBlockName('');
        setIsBlockChecked(false);
    };

    return (
        <div className={styles.wrapper} style={{ marginLeft: '400px', fontSize: '22px' }}>
            <div className={styles.player}>
                <div className={styles.panel}>
                    <div className={styles.hits}>
                        <h2>Удар</h2>
                        <label htmlFor="">
                            <span>Head</span>
                            <input
                                type="radio"
                                name="hit"
                                id="hit_1"
                                onChange={() => setUserHitName('head')}
                                checked={userHitName === 'head'}
                            />
                        </label>
                        <label htmlFor="">
                            <span>Chest</span>
                            <input
                                type="radio"
                                name="hit"
                                id="hit_2"
                                onChange={() => setUserHitName('chest')}
                                checked={userHitName === 'chest'}
                            />
                        </label>
                        <label htmlFor="">
                            <span>Legs</span>
                            <input
                                type="radio"
                                name="hit"
                                id="hit_3"
                                onChange={() => setUserHitName('legs')}
                                checked={userHitName === 'legs'}
                            />
                        </label>
                    </div>
                    <div className={styles.blocks}>
                        <h2>Блок</h2>
                        <label htmlFor="">
                            <span>Head</span>
                            <input
                                type="radio"
                                name="block"
                                id="block_1"
                                onChange={() => {
                                    setUserBlockName('head');
                                    setIsBlockChecked(true);
                                }}
                                checked={userBlockName === 'head'}
                            />
                        </label>
                        <label htmlFor="">
                            <span>Chest</span>
                            <input
                                type="radio"
                                name="block"
                                id="block_2"
                                onChange={() => {
                                    setUserBlockName('chest');
                                    setIsBlockChecked(true);
                                }}
                                checked={userBlockName === 'chest'}
                            />
                        </label>
                        <label htmlFor="">
                            <span>Legs</span>
                            <input
                                type="radio"
                                name="block"
                                id="block_3"
                                onChange={() => {
                                    setUserBlockName('legs');
                                    setIsBlockChecked(true);
                                }}
                                checked={userBlockName === 'legs' && isBlockChecked}
                            />
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
