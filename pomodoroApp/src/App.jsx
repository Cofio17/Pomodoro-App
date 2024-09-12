import { useEffect, useState, useRef, act } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import click from "./sounds/click.mp3";
import clockRinging from "./sounds/ringing.mp3";

function App() {
  const [timer, setTimer] = useState(0);
  const [active, setActive] = useState(false);
  const [inputValue, setinputValue] = useState("");

  useEffect(() => {
    const handleTimer = () => {
      if (active && timer > 0) {
        setTimeout(() => {
          setTimer((curr) => curr - 1);
        }, 1000);
      }
    };

    const alarmRinging = () => {
      playSound(clockRinging);
    };
    if (timer === 5) {
      alarmRinging();
    }
    handleTimer();
  }, [active, timer]);

  //chatGPT je ovo radio
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Ako je više od jednog sata, prikazuj "sati:minuti"
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}:${remainingMinutes < 10 ? "0" : ""}${remainingMinutes}`;
    }

    // Prikazuj "minuti:sekunde"
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleInput = (e) => {
    setinputValue(e.target.value);
  };

  const handlePause = () => {
    if (timer > 0) {
      setActive(!active);
      playSound(click);
    }
  };

  const startTimer = () => {
    if (inputValue !== "") {
      setActive(true);
      setinputValue("");
      setTimer(parseInt(inputValue));
      playSound(click);
    }
  };

  const resetTimer = () => {
    setActive(false);
    setinputValue("");
    setTimer();
    playSound(click);
  };

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  return (
    <>
      <h1>Pomodoro APP by Cofi</h1>
      <div className="container-timer">
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={handleInput}
          placeholder="unesite vreme u sekundama"
        />

        <div className="naslov">{active ? "Ucenje" : "Pauza"}</div>

        <div className={`timer ${active ? "pastelBlue" : "pastelRed"}`}>
          <p>{formatTime(timer)}</p>
        </div>

        <div className="container-buttons">
          <button onClick={startTimer}>Start</button>
          <button
            className={active ? "pastelGreen" : "pastelRed"}
            onClick={handlePause}
          >
            {active ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
