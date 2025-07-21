import { FiRotateCw } from 'react-icons/fi';

export default function Scoreboard({title, score, handleScore, won, isRunning}){
    const mainSec = `flex flex-col items-center flex-1 gap-6 my-8`
    const titleStl = `text-3xl font-bold `
    const scoreboard = `py-8 bg-stone-400 rounded-lg text-8xl font-bold w-[150px] text-center digital
                        bg-gradient-to-b shadow-lg shadow-stone-300/30
                        ${won ? "from-rose-300 to-rose-200" : "from-stone-400 to-stone-300"}
                        ${won ? "text-rose-700" : "text-stone-800"}`
    const btnSec = `flex justify-center gap-2`
    const btn = `border border-stone-400 rounded-md p-1 h-8 w-8 flex items-center justify-center 
                 shadow-lg shadow-stone-300/20 bg-gradient-to-b from-stone-800 to-stone-700
                 hover:cursor-pointer hover:transform hover:scale-115 active:scale-95`
    return(
        <div className={mainSec}>
            <h1 className={titleStl}>{title}</h1>
            <h1 className={scoreboard}>{score}</h1>
            <div className={btnSec}>
                <button 
                  className={btn} 
                  onClick={() => handleScore("add")} 
                  disabled={!isRunning}
                >+1
                </button>
                <button 
                  className={btn} 
                  onClick={() => handleScore("subtract")} 
                  disabled={!isRunning}
                >-1
                </button>
                <button 
                  className={btn} 
                  onClick={() => handleScore("reset")} 
                  disabled={!isRunning}
                ><FiRotateCw />
                </button>
            </div>
        </div>
    )
}