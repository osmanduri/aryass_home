
interface MenuElementProps {
    element:{
        titre:string;
        icon:string;
        url:string;
    }
    choiceMenu:string;
}

export default function MenuElement({element, choiceMenu}:MenuElementProps) {
  return (
    
    <div className='flex flex-col items-center cursor-pointer'>
        <img className='w-7 h-7 max-sm:w-4 max-sm:h-4' src={`/profile/menu/${element.icon}`} alt="icon"/>
        <p className={`text-md max-sm:text-sm  ${element.titre === choiceMenu && 'font-bold'}`}>{element.titre}</p>
        { element.titre === choiceMenu && <div className='w-full h-1 bg-black'/> }
    </div>
  )
}
