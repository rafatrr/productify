import React from 'react'
import { useEffect, useState  } from 'react';
import { PaletteIcon } from 'lucide-react';
const THEMES = [  
  'light',
  'dark',
  'retro'
]




const ThemeSelector = () => {
  const [theme, setTheme] = useState(()=>{
    if(typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='dropdown dropdown-endc flex items-center'>
      <div className="btn btn-ghost btn-sm gap-1  " tabIndex={0} role='button'>

         <PaletteIcon /> 
         <span className='hidden sm:inline'>Theme </span> 
      </div>
      <ui   tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-30 overflow-y-auto flex-nowrap mt-40 ">
      {
        THEMES.map((themeItems) => (
          
          <li key={themeItems}>
            <button className={` flex justify-between ${theme === themeItems ? 'bg-primary text-primary-content' : '' } `} onClick={() => setTheme(themeItems)} >
              {themeItems}
            </button>
          </li>
        ))
      }
        </ui>




    </div>
  )
}

export default ThemeSelector
