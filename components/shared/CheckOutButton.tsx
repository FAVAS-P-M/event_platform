"use client"
import {IEvent} from '@/mongodb/database/models/event.model'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'
import CheckOut from './CheckOut'



const CheckOutButton = ({event}:{event:IEvent}) => {
   const {user}=useUser()
   const userId=user?.publicMetadata.userId as string;
   
    const hasEventFinished=new Date(event.endDateTime) < new Date()
  return (
    <div className='flex items-center gap-3'>
   {hasEventFinished ? (
    <p className='p-2 text-red-400'>Sorry! tikcets are no longer available</p>
   ):(
    <>
<SignedOut>

  <Button asChild className='rounded-full' size='lg'>
    <Link href='/sign-in'>Get Tickets</Link>
    </Button>  
</SignedOut>

<SignedIn>
<CheckOut event={event} userId={userId}   />

</SignedIn>
   </>
   )}
    </div>
  )
}

export default CheckOutButton
