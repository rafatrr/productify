import React from 'react'
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react'
import { ShoppingBag, PlusIcon , UserIcon } from 'lucide-react';
import { Link } from 'react-router';
import ThemeSelector from './ThemeSelector';
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
    const {isSignedIn} = useAuth()
      const { t } = useLanguage();
  return (
    <div className='navbar bg-base-300'>
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
        {/* logo */}
        <div className="flex-1">
            <Link to="/" className='btn btn-ghost text-xl gap-2'>
              <ShoppingBag />
              <span className='text-lg font-bold  font-mono uppercase -tracking-tighter'> Productfy</span>
            </Link>
        </div>
        {/* right side */}
        <div className="flex gap-2 items-center">
            <ThemeSelector />
            {isSignedIn ? (
                <>
                <Link to="/create" className='btn btn-primary btn-sm gap-1 hidden md:inline-flex'>
                    <PlusIcon size={16} />
                    <span > {t('newProduct')}</span>
                </Link>
                <Link to="/profile" className='btn btn-ghost btn-sm gap-1'>
                    <UserIcon size={16} />
                    <span className=' hidden sm:inline '> {t('profile')}</span>
                </Link>
                <UserButton/>
                </>
                ) : (
                    <>
                    <SignInButton >
                        <button className='btn btn-ghost btn-sm'>{t('signIn')}</button>
                    </SignInButton>
                    <SignUpButton >
                        <button className='btn btn-primary btn-ghost btn-sm'>{t('signUp')}</button>  
                    </SignUpButton>
                    </> 
            ) }
        </div>
      </div>
    </div>
  )
}
export default Navbar;
