import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'

import Link from 'next/link'

import React from 'react'

const ProfilePage = async() => {
    const {sessionClaims}=auth();
    const userId = sessionClaims?.userId as string;
 
    const organizedEvents=await getEventsByUser({userId,page:1})
 
 
 return (
<>
{/* my tickets */}
<section className='bg-blue-50 bg-cover bg-center py-4 md:py-10 '>
<div className='flex items-center justify-center sm:justify-between' >
<h3 className='h3-bold text-ceter sm:text-left '>My Tickets</h3>
<Button asChild className='hidden sm:flex' size='lg'>
<Link href='/#events'>Explore More Events</Link>
</Button>
</div>
</section>

<section className='my-8'>
<Collection
data={organizedEvents?.data}
emptyTitle='No event tickets Purchased Yet'
emptyStateSubtext='No worries-plenty of exciting events to explore!'
collectionType='My_Tickets'
limit={3}
page={1}
urlParamName='ordersPage'
totalPages={2}
/>
</section>

{/* Events organised */}

<section className='bg-blue-50 bg-cover bg-center py-4 md:py-10 '>
<div className='flex items-center justify-center sm:justify-between' >
<h3 className='h3-bold text-ceter sm:text-left '>Events Organised</h3>
<Button asChild className='hidden sm:flex' size='lg'>
<Link href='/events/create'>Create New Event</Link>
</Button>
</div>
</section>

{/* <section className='my-8'>
<Collection
data={events?.data}
emptyTitle='No events created Yet'
emptyStateSubtext='Go! Create some now!'
collectionType='Events_Organised'
limit={6}
page={1}
urlParamName='eventsPage'
totalPages={2}
/>
</section> */}


</>
  )
}

export default ProfilePage
