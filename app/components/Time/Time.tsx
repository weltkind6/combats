import React, { useEffect, useState } from "react";

const Time: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedTime = typeof window !== "undefined"
        ? time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        : time.toLocaleTimeString();

    return <div>{formattedTime}</div>;
};

export default Time;
