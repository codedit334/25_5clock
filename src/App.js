import './App.css';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { CgPlayPause } from 'react-icons/cg';
import { BsFillPlayFill } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState, useRef } from 'react';

export default function App() {
  const [newSession, setNewSession] = useState(true);

  const [session, setSession] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [minutesDone, setMinutesDone] = useState(false);

  const [isBreak, setIsBreak] = useState(false);

  const [playTimer, setPlayTimer] = useState(false);

  const playBool = useRef(false);
  const audioBool = useRef(false);
  const audioQuery = useRef();

  const resetButton = () => {
    playBool.current = false;
    document.querySelector('.beep').pause();
    document.querySelector('.beep').currentTime = 0;
    setSession(25);
    setBreakTime(5);
    setMinutesDone(false);
    setIsBreak(false);
    setPlayTimer(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
  };
  useEffect(() => {
    if (audioBool.current) {
      document.querySelector('.beep').play();
      audioBool.current = false;
    }
  }, [audioBool.current]);

  const countdown = (minutesArg) => {
    setMinutes(minutesArg);
    setMinutesDone(false);
  };

  useEffect(() => {
    if (isBreak) countdown(breakTime);
    else countdown(session);
  }, [isBreak]);

  useEffect(() => {
    if (playTimer && playBool.current) {
      setTimeout(async () => {
        if (minutes === 0 && playTimer) {
          setMinutesDone(true);
        }

        if (seconds === 0 && minutesDone && playTimer) {
          audioBool.current = true;
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
        return 0;
      }, 1000);
    }
  }, [playBool.current, minutes, seconds]);

  return (
    <div className="App">
      <div className="controls">
        <div className="break-wrapper">
          <div id="break-label">Break Length</div>
          <div className="break-params">
            <button
              id="break-increment"
              type="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={() => {
                if (playTimer) return 1;
                if (breakTime === 60) {
                  setBreakTime(breakTime);
                  if (isBreak) setMinutes(breakTime);
                } else {
                  setBreakTime(breakTime + 1);
                  if (isBreak) setMinutes(breakTime + 1);
                }
                return 0;
              }}
            >
              <FiArrowUp />
            </button>
            <div id="break-length">{breakTime}</div>
            <button
              id="break-decrement"
              type="button"
              onClick={() => {
                if (playTimer) return 1;
                if (breakTime === 1) {
                  setBreakTime(breakTime);
                  if (isBreak) setMinutes(breakTime);
                } else {
                  setBreakTime(breakTime - 1);
                  if (isBreak) setMinutes(breakTime - 1);
                }
                return 0;
              }}
            >
              <FiArrowDown />
            </button>
          </div>
        </div>

        <div className="session-wrapper">
          <div id="session-label">Session Length</div>
          <div className="session-params">
            <button
              id="session-increment"
              type="button"
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
                return 0;
              }}
            >
              <FiArrowUp />
            </button>
            <div id="session-length">{session}</div>
            <button
              id="session-decrement"
              type="button"
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
                return 0;
              }}
            >
              <FiArrowDown />
            </button>
          </div>
        </div>
      </div>
      <div className="timerWrapper">
        <div id="timer-label">{isBreak ? 'Break' : 'Session'}</div>
        <div id="time-left">
          {/* eslint-disable-next-line no-nested-ternary */}
          {seconds === 60
            ? minutes + 1
            : minutes === 0
              ? '00'
              : String(minutes).padStart(2, '0')}
          :
          {/* eslint-disable-next-line no-nested-ternary */}
          {seconds === 60
            ? '00'
            : seconds === 0
              ? '00'
              : String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          id="start_stop"
          style={{
            backgroundColor: '#FFEAAE', borderRadius: '20px', padding: '0', height: '120px',
          }}
          onClick={() => {
            playBool.current = !playBool.current;
            if (newSession) countdown(session);

            setPlayTimer(!playTimer);
            setNewSession(false);
          }}
        >
          <BsFillPlayFill />
          <CgPlayPause />
        </button>
        <button type="button" id="reset" onClick={() => resetButton()}>
          <GrPowerReset style={{ backgroundColor: '#FFEAAE', borderRadius: '50%', padding: '10px' }} />
        </button>
      </div>
      <audio
        src="https://www.soundjay.com/buttons/sounds/button-2.mp3"
        ref={audioQuery}
        className="beep"
        id="beep"
      >
        <track kind="captions" label="English" src="" default />
      </audio>
    </div>
  );
}
