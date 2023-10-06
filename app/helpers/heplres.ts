export const barColorHandler = (currentHp: number) => {
    return currentHp < 300 ? "danger" : (currentHp < 600 ? "warning" : "success")
}

