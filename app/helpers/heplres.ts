import {computerNames} from "@/app/data";

export const barColorHandler = (currentHp: number) => {
    return currentHp < 300 ? "danger" : (currentHp < 600 ? "warning" : "success")
}

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
};
export const currentTime = getCurrentTime();


export const generateRandomBlockOrHit = () => {
    const hitsList = ['голову', 'грудь', 'ноги']
    const randomIndex = Math.floor(Math.random() * hitsList.length)

    return hitsList[randomIndex]
}

const generateRandomCompName = () => {
    const compNames = computerNames
    const randomIndex = Math.floor(Math.random() * compNames.length)

    return compNames[randomIndex]
}
export const randomCompName = generateRandomCompName()

