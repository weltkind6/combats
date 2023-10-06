"use client"
import {useCallback, useState} from "react";
import styles from './styles.module.css'
import dynamic from "next/dynamic";
import {Button, FormGroup, Input, Label, Progress} from "reactstrap";
import {barColorHandler, getRandomBlockOrHit} from "@/app/helpers/heplres";
import Image from "next/image";
import playerImg from '../../public/img/imageBK1.jpeg'
import computerImg from '../../public/img/imageBK2.jpeg'

const DynamicClock = dynamic(() => import("../components/Time/Time"), {
    ssr: false,
});
const FightPage = () => {

    // Пользователь
    const [userHp, setUserHp] = useState<number>(1000);
    const [currUserHp, setCurrUserHp] = useState<number>(1000);
    const [userDamage, setUserDamage] = useState<number>(0);
    const [userHitName, setUserHitName] = useState<string>('');
    const [hitToRender, setHitToRender] = useState('')
    const [userBlockName, setUserBlockName] = useState<string>('');
    const [isBlockChecked, setIsBlockChecked] = useState<boolean>(false);
    const [isHitChecked, setIsHitChecked] = useState<boolean>(false);
    const [successUserBlock, setSuccessUserBlock] = useState(false)
    const [successUserBlockText, setSuccessUserBlockText] = useState('')

    // ИИ
    const [computerHp, setComputerHp] = useState<number>(1000);
    const [currComputerHp, setCurrComputerHp] = useState<number>(1000);
    const [computerDamage, setComputerDamage] = useState<number>(0);
    const [computerHitName, setComputerHitName] = useState<string>('');
    const [computerBlockName, setComputerBlockName] = useState<string>('');
    const [successCompBlock, setSuccessCompBlock] = useState(false)
    const [successCompBlockText, setSuccessCompBlockText] = useState('')

    const [isFightStarted, setIsFightStarted] = useState(false)

    const damageHandler = useCallback(() => {
            // Рендер ударов и блоков (лог боя)
            setHitToRender(userHitName)
            // Проверка: выбран ли блок/удар
            if (!isHitChecked || !isBlockChecked) {
                alert('Блок или удар не выбран!')
                return;
            }
            // Начало боя
            if(isHitChecked && isBlockChecked) {
                setIsFightStarted(true)
            }

            // Остаток ХП User
            if (currUserHp <= 0 || currComputerHp <= 0) {
                return null;
            }
            const computerDamageCount = Math.floor(Math.random() * 100) + 1;
            setComputerDamage(computerDamageCount);
            const remainingUserHp = Math.max(currUserHp - computerDamageCount, 0);

            //Имитатор ИИ. Удар компа и случайный блок
            const getRandomCompHit = getRandomBlockOrHit()
            const getRandomCompBlock = getRandomBlockOrHit()
            setComputerBlockName(getRandomCompBlock)
            setComputerHitName(getRandomCompHit)

            // Остаток ХП ИИ
            const userDamageCount = Math.floor(Math.random() * 100) + 1;
            setUserDamage(userDamageCount);
            const remainingComputerHp = Math.max(currComputerHp - userDamageCount, 0);

            // Проверка смог ли User заблокировать удар ИИ
            if (userBlockName === getRandomCompHit) {
                console.log('User blocked successfully!')
                setSuccessUserBlockText(`Комп пытался провести удар но наглый User заблокировал удар в ${userBlockName}`)
                setSuccessUserBlock(true)
                setUserHitName('');
                setUserBlockName('');
                setIsBlockChecked(false);
                return currUserHp
            } else {
                setSuccessUserBlock(false)
                setCurrUserHp(remainingUserHp)
            };

            // Проверка смог ли ИИ заблокировать удар User
            if (computerBlockName === userHitName) {
                console.log('Comp blocked successfully!')
                setSuccessCompBlockText(`User пытался провести удар но наглый Comp заблокировал удар в ${computerBlockName}`)
                setSuccessCompBlock(true)
                setUserHitName('');
                setUserBlockName('');
                setIsBlockChecked(false);
                return currComputerHp
            } else {
                setSuccessCompBlock(false)
                setCurrComputerHp(remainingComputerHp)
            };

            // Очистка инпутов
            setUserHitName('');
            setUserBlockName('');
            setIsBlockChecked(false);

        },
        [
            currUserHp,
            currComputerHp,
            isHitChecked,
            isBlockChecked,
            userBlockName,
            userHitName,
            computerBlockName
        ])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.playerBlock}>
                    <div>Name: Player</div>
                    <Progress
                        min="0"
                        max="1000"
                        className="my-3"
                        color={barColorHandler(currUserHp)}
                        value={currUserHp.toString()}
                    >
                        {currUserHp}
                    </Progress>
                    <Image
                        src={playerImg}
                        alt="player"
                        width="150"
                        className={styles.usersAvatar}
                    />
                </div>
                <div className={styles.player}>
                    <div className={styles.panel}>
                        <div className={styles.hits}>
                            <h2>Удар</h2>
                            <label htmlFor="">
                                <span>Head</span>
                                <Input
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
                                <Input
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
                                <Input
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
                                <Input
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
                                <Input
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
                                <Input
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
                        <button onClick={damageHandler}>Hit!</button>
                    </div>
                </div>
                <div className={styles.computerBlock}>
                    <div>Name: Computer</div>
                    <Progress
                        min="0"
                        max="1000"
                        className="my-3"
                        color={barColorHandler(currComputerHp)}
                        value={currComputerHp.toString()}
                    >
                        {currComputerHp}
                    </Progress>
                    <Image
                        src={computerImg}
                        alt="computerImg"
                        width="150"
                        className={styles.computerAvatar}
                    />
                </div>
            </div>

            <Button
                color="warning"
                outline
            >
                warning
            </Button>

            {isFightStarted && (
                <div className={styles.fightLog}>
                    <h2>Часы показывали <DynamicClock /> когда комп и игрок бросили друг-другу вызов</h2>
                    {successUserBlock ?
                        <div>{successUserBlockText}</div> :
                        <div>User пытался что-то сказать, но в это время Комп влепил мощнейший удар в &nbsp;
                            <strong>
                                {computerHitName} {!successUserBlock && <span>-</span>}
                                {computerDamage} <span>{`[${currUserHp}/${userHp}]`}</span>
                            </strong>
                        </div>
                    }
                    {successCompBlock ?
                        <div>{successCompBlockText}</div> :
                        <div>Comp засмотрелся и в это время небритый User влепил удар в &nbsp;
                            <strong>
                                {hitToRender} {!successCompBlock && <span>-</span>}
                                {userDamage} <span>{`[${currComputerHp}/${computerHp}]`}</span>
                            </strong>
                        </div>
                    }

                </div>
            )}
        </div>
    );
};

export default FightPage;
