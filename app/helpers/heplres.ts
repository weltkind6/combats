export const barColorHandler = (currentHp: number) => {
    return currentHp < 300 ? "danger" : (currentHp < 600 ? "warning" : "success")
}

export const getRandomBlockOrHit = () => {
    const hitsList = ['head', 'chest', 'legs']
    const randomIndex = Math.floor(Math.random() * hitsList.length)

    return hitsList[randomIndex]
}
