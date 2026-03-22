import React from 'react'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'
import { ShoppingCart ,ShoppingBag, PlusIcon , UserIcon } from 'lucide-react';
import { Link } from 'react-router';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
    const {isSignedIn} = useAuth()
  return (
    <div className='navbar bg-base-300'>
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
        {/* logo */}
        <div className="flex-1">
            <Link to="/" className='btn btn-ghost text-xl gap-2'>
              <ShoppingBag />
              <span className='text-lg font-bold  font-mono uppercase -tracking-tighter'>Productfy</span>
            </Link>
        </div>
        {/* right side */}
        <div className="flex gap-2 items-center">
            <ThemeSelector />
            {isSignedIn ? (
                <>
                <Link to="/create" className='btn btn-primary btn-sm gap-1'>
                    <PlusIcon size={16} />
                    <span > New Product</span>
                </Link>
                <Link to="/profile" className='btn btn-ghost btn-sm gap-1'>
                    <UserIcon size={16} />
                    <span className=' hidden sm:inline '>Profile</span>
                </Link>
                <UserButton/>
                </>
                ) : (
                    <>
                    <SignInButton >
                        <button className='btn btn-ghost btn-sm'>Sign In </button>
                    </SignInButton>
                    <SignUpButton >
                        <button className='btn btn-primary btn-ghost btn-sm'>Sign Up </button>  
                    </SignUpButton>
                    </> 
            ) }
        </div>
      </div>
    </div>
  )
}
export default Navbar;
