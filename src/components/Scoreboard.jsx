import { FiRotateCw } from 'react-icons/fi';

import Btn from './Btn';

export default function Scoreboard({title, score, handleScore, won, isRunning}){
    const mainSec = `flex flex-col items-center flex-1 gap-6 my-8`
    const titleStl = `text-3xl font-bold `
    const scoreboard = `py-8 bg-stone-400 rounded-lg text-8xl font-bold w-full md:w-[150px] text-center digital
                        bg-gradient-to-b shadow-lg shadow-stone-300/30
                        ${won ? "from-rose-300 to-rose-200" : "from-stone-400 to-stone-300"}
                        ${won ? "text-rose-700" : "text-stone-800"}`
    const btnSec = `flex justify-center gap-2`
    
    return(
        <section className={mainSec}>
            <h2 className={titleStl}>{title}</h2>
            <h3 className={scoreboard}>{score}</h3>
            <div className={btnSec}>
                <Btn onClick={() => handleScore("add")} disabled={!isRunning}>+1</Btn>
                <Btn onClick={() => handleScore("subtract")} disabled={!isRunning}>-1</Btn>
                <Btn onClick={() => handleScore("reset")} disabled={!isRunning} title="Reset score" aria-label="reset score">
                    <FiRotateCw />
                </Btn>
            </div>
        </section>
    )
}