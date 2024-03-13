import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
   <header className='w-full border-b px-4 md:px-10 '>
    <div className='flex items-center justify-between'>
<Link href='/' className='w-36'>
   <Image  src='/assets/logo.svg' width={100} height={20} alt='Events' /> 
</Link>

<SignedIn>
<nav className=' hidden w-full max-w-xs md:flex '>
    <NavItems/>
</nav>
</SignedIn>


<div className='flex w-32 justify-end gap-3'>
    <SignedIn>
       <UserButton afterSignOutUrl='/' /> 
       <MobileNav/>
    </SignedIn>
<SignedOut>
    <Button asChild className='rounded-full' size='lg'>
        <Link href='/sign-in'>Login</Link>
    </Button>
</SignedOut>

</div>


    </div>

   </header>
  )
}

export default Header
