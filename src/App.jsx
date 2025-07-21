import { useState, useEffect, useRef } from "react"

import Scoreboard from "./components/Scoreboard"

function App() {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  //const START_TIME = 3 * 60
  const START_TIME = 3 * 60
  const [timeLeft, setTimeLeft] = useState(START_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  //winning conditions
  const homeWon = timeLeft <= 0 && homeScore > awayScore
  const awayWon = timeLeft <= 0 && homeScore < awayScore

  //tailwind styles

  const mainSec = `bg-stone-800 mx-auto mt-16 w-[600px] rounded-lg
                   flex flex-col items-center text-stone-400`
  const scoreboardsSec = `flex gap-18`
  const btn = `my-10 border-4 border-stone-400 rounded-lg shadow-lg shadow-stone-300/30 w-4/12
               hover:transform hover:scale-115 active:scale-95 py-2 px-10
               font-bold text-lg bg-gradient-to-b from-stone-800 to-stone-700`
  const title = `mt-10 text-xl font-bold`
  
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
      setTimeLeft(START_TIME)
      setAwayScore(0)
      setHomeScore(0)
    } else if(timeLeft === 0) {
      setTimeLeft(START_TIME)
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
  
  return (
    <div className={mainSec}>
      <h1 className={title}>{formatTime(timeLeft)}</h1>
      <div className={scoreboardsSec}>
        <Scoreboard title="Home" score={homeScore} handleScore={handleHomeScore} won={homeWon} isRunning={isRunning}/>
        <Scoreboard title="Away" score={awayScore} handleScore={handleAwayScore} won={awayWon} isRunning={isRunning} />
      </div>
      <button className={btn} onClick={handleTimerButton}>
        {timeLeft <= 0 ? "Set Game" : isRunning ? "Reset Game" : "Start Game"}
      </button>
    </div>
  )
}

export default App
