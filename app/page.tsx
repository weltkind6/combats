"use client"
import { useState } from "react";
import styles from './page.module.css'

export default function Home() {
    // Пользователь
    const [userHp, setUserHp] = useState<number>(1000);
    const [userDamage, setUserDamage] = useState<number>(0);
    const [userHitName, setUserHitName] = useState<string>('');
    const [userBlockName, setUserBlockName] = useState<string>('');
    const [isBlockChecked, setIsBlockChecked] = useState<boolean>(false);
    const [isHitChecked, setIsHitChecked] = useState<boolean>(false);
    const [hitToRender, setHitToRender] = useState('')
    const [successUserBlock, setSuccessUserBlock] = useState(false)
    const [successUserBlockText, setSuccessUserBlockText] = useState('')

    // ИИ
    const [computerHp, setComputerHp] = useState<number>(1000);
    const [computerDamage, setComputerDamage] = useState<number>(0);
    const [computerHitName, setComputerHitName] = useState<string>('');
    const [computerBlockName, setComputerBlockName] = useState<string>('');
    const [successCompBlock, setSuccessCompBlock] = useState(false)
    const [successCompBlockText, setSuccessCompBlockText] = useState('')

    const damageHandler = () => {
        // Рендер ударов и блоков (лог боя)
        setHitToRender(userHitName)
        // Проверка: выбран ли блок/удар
        if (!isHitChecked || !isBlockChecked) {
            console.log('Error');
            return;
        }

        // Остаток ХП User
        if (userHp <= 0 || computerHp <= 0) {
            return null;
        }
        const computerDamageCount = Math.floor(Math.random() * 100) + 1;
        setComputerDamage(computerDamageCount);
        const remainingUserHp = Math.max(userHp - computerDamageCount, 0);

        //Имитарор ИИ. Удар компа и случайный блок
        const hitsList = ['head', 'chest', 'legs']
        const randomHitIndex = Math.floor(Math.random() * hitsList.length)
        const randomBlockIndex = Math.floor(Math.random() * hitsList.length)
        const getRandomCompHit = hitsList[randomHitIndex]
        const getRandomCompBlock = hitsList[randomBlockIndex]
        setComputerBlockName(getRandomCompBlock)
        setComputerHitName(getRandomCompHit)

        // Остаток ХП ИИ
        const userDamageCount = Math.floor(Math.random() * 100) + 1;
        setUserDamage(computerDamageCount);
        const remainingComputerHp = Math.max(computerHp - userDamageCount, 0);

        // Проверка смог ли User заблокировать удар ИИ
        if (userBlockName === getRandomCompHit) {
            console.log('User blocked successfully!')
            setSuccessUserBlockText(`Комп пытался провести удар но наглый User заблокировал удар в ${userBlockName}`)
            setSuccessUserBlock(true)
            setUserHitName('');
            setUserBlockName('');
            setIsBlockChecked(false);
            return userHp
        } else {
            setSuccessUserBlock(false)
            setUserHp(remainingUserHp)
        };

        // Проверка смог ли ИИ заблокировать удар User
        if (computerBlockName === userHitName) {
            console.log('Comp blocked successfully!')
            setSuccessCompBlockText(`User пытался провести удар но наглый Comp заблокировал удар в ${computerBlockName}`)
            setSuccessCompBlock(true)
            setUserHitName('');
            setUserBlockName('');
            setIsBlockChecked(false);
            return computerHp
        }
        setComputerHp(remainingComputerHp);

        // Очиска инпутов
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
                                onChange={() => {
                                    setUserHitName('head')
                                    setIsHitChecked(true)
                                }}
                                checked={userHitName === 'head'}
                            />
                        </label>
                        <label htmlFor="">
                            <span>Chest</span>
                            <input
                                type="radio"
                                name="hit"
                                id="hit_2"
                                onChange={() => {
                                    setUserHitName('chest')
                                    setIsHitChecked(true)
                                }}
                                checked={userHitName === 'chest'}
                            />
                        </label>
                        <label htmlFor="">
                            <span>Legs</span>
                            <input
                                type="radio"
                                name="hit"
                                id="hit_3"
                                onChange={() => {
                                    setUserHitName('legs')
                                    setIsHitChecked(true)
                                }}
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
            <div className={styles.fightLog}>
                {successUserBlock ?
                    <div>{successUserBlockText}</div> :
                    <div>Комп влепил удар в <strong>{computerHitName}</strong>
                    </div>
                }
                {successCompBlock ?
                    <div>{successCompBlockText}</div> :
                    <div>User влепил удар в <strong>{computerHitName}</strong>
                    </div>
                }

            </div>
        </div>
    );
}
