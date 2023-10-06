import {computerNames} from "@/app/data";

export const barColorHandler = (currentHp: number) => {
    return currentHp < 300 ? "danger" : (currentHp < 600 ? "warning" : "success")
}

export const generateRandomBlockOrHit = () => {
    const hitsList = ['head', 'chest', 'legs']
    const randomIndex = Math.floor(Math.random() * hitsList.length)

    return hitsList[randomIndex]
}

export const generateRandomCompName = () => {
    const compNames = computerNames
    const randomIndex = Math.floor(Math.random() * compNames.length)

    return compNames[randomIndex]
}
