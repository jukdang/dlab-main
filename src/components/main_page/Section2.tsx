import { useEffect, useRef, useState } from "react";

const MainSection2 = () => {
    const [timer, setTimer] = useState(0);
    const timerIntervalRef = useRef(0);

    const startInterval = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        setTimer(0);

        timerIntervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

    };

    useEffect(() => {
        startInterval();

        return () => clearInterval(timerIntervalRef.current);
    }, []);

    return (
    <section>
        <div>
            <h2> Main Section 2: Timer</h2>
            <div>
                <button onClick={startInterval}>timer is {timer}</button>
            </div>

        </div>
    </section>
    )
}

export default MainSection2;