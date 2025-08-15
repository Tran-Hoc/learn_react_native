import { useEffect, useState } from "react";

function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setTime((pre) => pre + 1);

        }, 1000);
        return () => clearInterval(id);

    }, []);


    return <h3> Time: {time}s</h3>
}

export default Timer;