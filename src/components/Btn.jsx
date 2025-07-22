export default function Btn({children, title, disabled = false, ...rest}){

    const style = `border border-stone-400 rounded-md p-1 h-8 w-8 flex items-center justify-center 
                   shadow-lg shadow-stone-300/20 bg-gradient-to-b from-stone-800 to-stone-700 
                   hover:cursor-pointer hover:transform hover:scale-115 active:scale-95`
    return(
        <button 
          type="button" 
          className={style} 
          aria-label={title}
          aria-disabled={disabled}
          disabled={disabled}
          {...rest} 
        >{children}
        </button>
    )
}