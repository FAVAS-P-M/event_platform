import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/mongodb/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'

import Link from 'next/link'



const ProfilePage = async({searchParams}:SearchParamProps ) => {
    const {sessionClaims}=auth();
    const userId = sessionClaims?.userId as string;

const ordersPage=Number(searchParams?.ordersPage) || 1;
const eventsPage=Number(searchParams?.eventsPage) || 1;

 
const orders=await getOrdersByUser({userId,page:1})
    
 const orderedEvents=orders?.data.map((order:IOrder)=>order.event) || [];
 
 const organizedEvents=await getEventsByUser({userId,page:1})
 console.log({orderedEvents})
 
 return (
<>
{/* my tickets */}
<section className='bg-blue-50 bg-cover bg-center py-4 md:py-10 '>
<div className='flex items-center justify-center sm:justify-between pr-10' >
<h3 className='font-extrabold text-ceter sm:text-left pl-10'>My Tickets</h3>
<Button asChild className='hidden sm:flex' size='lg'>
<Link href='/#events'>Explore More Events</Link>
</Button>
</div>
</section>

<section className='my-8'>
<Collection
data={organizedEvents?.data}
emptyTitle='No events Created Yet'
emptyStateSubtext=' Go !!! Create Some Now!!!'
collectionType='Events_Organized'
limit={6}
page={eventsPage}
urlParamName='eventsPage'
totalPages={organizedEvents?.totalPages}
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

<section className='my-8'>
<Collection
data={orderedEvents}
emptyTitle='No events organised Yet'
emptyStateSubtext='No Worries...Plenty of events to explore!!!'
collectionType='My_Tickets'
limit={6}
page={ordersPage}
urlParamName='ordersPage'
totalPages={orders?.totalPages}
/>
</section>


</>
  )
}

export default ProfilePage
