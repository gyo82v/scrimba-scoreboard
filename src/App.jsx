import { useState, useEffect, useRef } from "react"
import { FaRegClock } from 'react-icons/fa';

import Scoreboard from "./components/Scoreboard"
import Btn from "./components/Btn";

function App() {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [startTime, setStartTime] = useState(3 * 60)
  const [timeLeft, setTimeLeft] = useState(startTime)
  const [isRunning, setIsRunning] = useState(false)
  const [timeSec, setTimeSec] = useState(false)
  const timerRef = useRef(null)

  //winning conditions
  const homeWon = timeLeft <= 0 && homeScore > awayScore
  const awayWon = timeLeft <= 0 && homeScore < awayScore

  //tailwind styles

  const mainSec = `bg-stone-800 mx-auto mt-16 w-11/12 md:w-[600px] rounded-lg
                   flex flex-col items-center text-stone-400`
  const headerSec = `flex mt-10 gap-4 `
  const scoreboardsSec = `flex gap-18`
  const btn = `my-10 border-4 border-stone-400 rounded-lg shadow-lg shadow-stone-300/30 w-4/12
               hover:transform hover:scale-115 active:scale-95 py-2 px-10
               font-bold text-lg bg-gradient-to-b from-stone-800 to-stone-700`
  const title = `text-xl font-bold`
  const inputTimer = `border border-stone-400 rounded-lg shadow-lg shadow-stone-300/20 font-semibold text-center
                      bg-stone-700 transition-all duration-200 ease-in-out focus:outline-none
                      focus:ring-2 focus:ring-stone-500 focus:bg-stone-600 focus:border-transparent
                      hover:bg-stone-600`
  //

  useEffect(() => {
    // Start the interval when isRunning goes true
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    }
    //set isRunning to false when the time is 0
    if(isRunning && timeLeft <= 0){
      clearInterval(timerRef.current)
      setIsRunning(false)
    }
    // Cleanup / stop
    return () => clearInterval(timerRef.current)
  }, [isRunning, timeLeft])

  //functions

  const handleTimerButton = () => {
    if (isRunning) {
      // “Reset game” clicked: stop & reset
      clearInterval(timerRef.current)
      setIsRunning(false)
      setTimeLeft(startTime)
      setAwayScore(0)
      setHomeScore(0)
    } else if(timeLeft === 0) {
      setTimeLeft(startTime)
      setAwayScore(0)
      setHomeScore(0)
    } else {
      // “Start game” clicked: (re)start
      setIsRunning(true)
    }
  }

  const formatTime = secs => {
    if (secs <= 0) return "Game Over"
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `Time: ${m}:${s.toString().padStart(2, "0")}`
  }

  const handleHomeScore = action => {
    action === "add" ? setHomeScore(s => s + 1) :
    action === "subtract" ? setHomeScore(s => s - 1) :
    action === "reset" ? setHomeScore(0) : ""
  }
  const handleAwayScore = action => {
    action === "add" ? setAwayScore(s => s + 1) :
    action === "subtract" ? setAwayScore(s => s - 1) :
    action === "reset" ? setAwayScore(0) : ""
  }
  const handleSetTimerClick = () => {
    setTimeSec(t => !t)
    setTimeLeft(startTime)

  }
  const handleChange = e => {
    // remove ALL leading zeros, but keep a single "0" if they clear the field completely
    const sanitized = e.target.value.replace(/^0+(?=\d)/, "");
    setStartTime(sanitized === "" ? "" : Number(sanitized));
  }

  return (
    <div className={mainSec}>
      <div className={headerSec}>
        {timeSec ?
         <>
           <input 
             type="number" 
             placeholder="Enter seconds..." 
             className={inputTimer}
             value={startTime}
             onChange={handleChange}
          />
           <Btn title="Set the Timer" onClick={handleSetTimerClick}>Set</Btn>
         </>   : 
         <>
           <h1 className={title}>{formatTime(timeLeft)}</h1>
           <Btn onClick={() => setTimeSec(t => !t)} disabled={isRunning} title="Set the timer" aria-label="set the timer">
            <FaRegClock />
           </Btn>
         </>
        }
      </div>
      <div className={scoreboardsSec}>
        <Scoreboard title="Home" score={homeScore} handleScore={handleHomeScore} won={homeWon} isRunning={isRunning}/>
        <Scoreboard title="Away" score={awayScore} handleScore={handleAwayScore} won={awayWon} isRunning={isRunning} />
      </div>
      <button className={btn} onClick={handleTimerButton} disabled={timeSec}>
        {timeLeft <= 0 ? "Set Game" : isRunning ? "Reset Game" : "Start Game"}
      </button>
    </div>
  )
}

export default App
