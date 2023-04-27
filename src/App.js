import "./App.css";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { CgPlayPause } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useRef } from "react";

function App() {
  const [newSession, setNewSession] = useState(true);

  const [session, setSession] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [minutesDone, setMinutesDone] = useState(false);

  const [isBreak, setIsBreak] = useState(false);

  const [playTimer, setPlayTimer] = useState(false);

  const playBool = useRef(false);
  let audioBool = useRef(false);
  const audioQuery = useRef();


  const resetButton = () => {
    playBool.current = false;
    document.querySelector(".beep").pause();
    document.querySelector(".beep").currentTime = 0;
    setSession(25);
    setBreakTime(5);
    setMinutesDone(false);
    setIsBreak(false);
    setPlayTimer(false);
    setMinutes(25);
    setSeconds(0);
  };

  useEffect(()=> {
    console.log("out")
    if(audioBool.current){
      console.log("in")
    document.querySelector(".beep").play();
    audioBool.current = false;}
  },[audioBool.current])

  useEffect(() => {
    if (isBreak) countdown(breakTime);
    else countdown(session);
  }, [isBreak]);

  const countdown = (minutesArg) => {
    setMinutes(minutesArg);
    setMinutesDone(false);
  };

  useEffect(() => {
    if (playTimer && playBool.current) {
      let myTimeout = setTimeout(async () => {
        if (minutes === 0 && playTimer) {
          setMinutesDone(true);
        }

        if (seconds === 0 && minutesDone && playTimer) {
          // document.querySelector(".beep").play();
          // setTimeout(() => {}, 1500);

          audioBool.current = true
          setIsBreak(!isBreak);
          setTimeout(() => {}, 1500);
          return 1;
        }

        if (playTimer) {
          if (seconds === 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            if (!playBool.current) {
              return 1;
            }
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
    }
  }, [playBool.current, minutes, seconds]);

  return (
    <div className="App">
      <div className="controls">
        <div className="break-wrapper">
          <div id="break-label">Break Length</div>
          <div className="break-params">
            <div
              id="break-increment"
              onClick={() => {
                if (playTimer) return 1;
                if (breakTime === 60) {
                  setBreakTime(breakTime);
                  if (isBreak) setMinutes(breakTime);
                } else {
                  setBreakTime(breakTime + 1);
                  if (isBreak) setMinutes(breakTime + 1);
                }
              }}
            >
              <FiArrowUp />
            </div>
            <div id="break-length">{breakTime}</div>
            <div
              id="break-decrement"
              onClick={() => {
                if (playTimer) return 1;
                if (breakTime === 1) {
                  setBreakTime(breakTime);
                  if (isBreak) setMinutes(breakTime);
                } else {
                  setBreakTime(breakTime - 1);
                  if (isBreak) setMinutes(breakTime - 1);
                }
              }}
            >
              <FiArrowDown />
            </div>
          </div>
        </div>

        <div className="session-wrapper">
          <div id="session-label">Session Length</div>
          <div className="session-params">
            <div
              id="session-increment"
              onClick={() => {
                if (playTimer) return 1;
                setSeconds(0);
                if (session === 60) {
                  setSession(session);
                  if (!isBreak) setMinutes(session);
                } else {
                  setSession(session + 1);
                  if (!isBreak) setMinutes(session + 1);
                }
              }}
            >
              <FiArrowUp />
            </div>
            <div id="session-length">{session}</div>
            <div
              id="session-decrement"
              onClick={() => {
                if (playTimer) return 1;
                setSeconds(0);
                if (session === 1) {
                  setSession(session);
                  if (!isBreak) setMinutes(session);
                } else {
                  setSession(session - 1);
                  if (!isBreak) setMinutes(session - 1);
                }
              }}
            >
              <FiArrowDown />
            </div>
          </div>
        </div>
      </div>
      <div className="timerWrapper">
        <div id="timer-label">{isBreak ? "Break" : "Session"}</div>
        <div id="time-left">
          {seconds === 60
            ? minutes + 1
            : minutes === 0
            ? "00"
            : String(minutes).padStart(2, "0")}
          :
          {seconds === 60
            ? "00"
            : seconds === 0
            ? "00"
            : String(seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          id="start_stop"
          style={{backgroundColor: "#FFEAAE", borderRadius: "20px", padding: "0", height: "120px"}}
          onClick={() => {
            playBool.current = !playBool.current;
            console.log(playBool.current);
            if (newSession) countdown(session);

            setPlayTimer(!playTimer);
            setNewSession(false);
          }}
        >
          <BsFillPlayFill />
          <CgPlayPause  />
        </button>
        <button type="button" id="reset" onClick={() => resetButton()}>
          <GrPowerReset  style={{backgroundColor: "#FFEAAE", borderRadius: "50%", padding: "10px" }} />
        </button>
      </div>
      <audio
        src="https://www.soundjay.com/buttons/sounds/button-2.mp3"
        ref={audioQuery}
        className="beep"
        id="beep"
      />
    </div>
  );
}

export default App;
