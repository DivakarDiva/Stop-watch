import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

    function App() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (running) {
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        }

        return () => {
        clearInterval(intervalRef.current);
        };
    }, [running]);

    const start = () => {
        setRunning(true);
    };

    const pause = () => {
        setRunning(false);
    };

    const reset = () => {
        setRunning(false);
        setTime(0);
    };

    // Convert seconds to HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
        )}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div style={styles.container}>
        <h1>Stopwatch</h1>

        <div style={styles.timer}>{formatTime(time)}</div>

        <div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button>
        </div>
        </div>
    );
    }

    const styles = {
    container: {
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial",
    },
    timer: {
        fontSize: "50px",
        margin: "30px",
        fontWeight: "bold",
    },
    };

createRoot(document.getElementById("root")).render(<App />);