export const getCurrentTime = () => {
    const currTime = new Date();

    let hours: number | string = currTime.getHours();
    let minutes: number | string = currTime.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    const formattedTime: string = hours + ":" + minutes;
    console.log(formattedTime);
}

