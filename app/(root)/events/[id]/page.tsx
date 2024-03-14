import CheckOutButton from '@/components/shared/CheckOutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'

import Image from 'next/image';


const EventDetails= async({params:{id},searchParams}:SearchParamProps) => {
 
 const event=await getEventById(id);
 console.log(event)

 const relatedEvents=await getRelatedEventsByCategory({
  categoryId:event.category._id,
  eventId:event._id,
  page:searchParams.page as string
 })
 
    return (
      <>
  <section className=' justify-center bg-blue-50 bg-contain '>
<div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>

<Image src={event.imageUrl}
alt='hero image'
width={1000}
height={1000}
className='h-full min-h-[300px] object-cover object-center'
/>
<div className='flex w-full flex-col gap-8 p-5 md:p-10'>
<div className='flex flex-col gap-8'>
<h2 className='text-2xl'>{event.title}</h2>
</div>

<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
    <div className='flex gap-3 '>
<p className='rounded-full bg-green-500 px-5 py-2 text-black'>{event.isFree  ? "FREE" :`${event.price}`}</p>
   <p className='rounded-full bg-gray-500 px-4 py-2.5 text-black '>{event.category.name}</p> 
    
    </div>

    <p className='ml-2 mt-2 sm:mt-0'>
        by {' '}
        <span className='text-blue-500'>{event.organizer.firstName} {event.organizer.lastName}</span>
    </p>

</div>
</div>

{/* checkout button */}
<div className='flex px-10'>
<CheckOutButton event={event}/>
</div>
<div className='flex flex-col gap-5 p-4'>
 <div className='flex gap-2 md:gap-3'>
  <Image 
  src='/assets/calendar.svg'
  alt='calendar'
  width={32}
  height={32}
  /> 
  <div className='flex flex-wrap items-center'>
  <p>{formatDateTime(event.startDateTime).dateOnly}-{' '}
  {formatDateTime(event.startDateTime).timeOnly}
  </p>

  <p>{formatDateTime(event.endDateTime).dateOnly}-{' '}
  {formatDateTime(event.endDateTime).timeOnly}
  </p>

  <p className='ml-1'>{formatDateTime(event.startDateTime).timeOnly}-{' '}</p><p className='ml-1'>{formatDateTime(event.endDateTime).timeOnly}</p>
  </div>
</div>   

<div className='flex items-center gap-3'>
<Image src='/assets/location.svg'
alt='location'
width={32}
height={32}
/>
<p className=''>{event.location}</p>
</div>
</div>

<div className='flex flex-col gap-2 px-10'>
<p className='text-bold-20 text-gray-600'>What You Will Learn</p>
<p>{event.description}</p>
<p className='underline'>{event.url}</p>
</div>


</div>
  </section>

{/* Events from the same category */}
  <section className='my-8 flex flex-col gap-8 md:gap-12 '>
<h2 className='font-extrabold text-3xl text-gray-700 w-full flex justify-center items-center'>Related Events</h2>
<Collection
data={relatedEvents?.data}
emptyTitle='No Events Found'
emptyStateSubtext='Come back later'
collectionType='All_Events'
limit={3}
page={searchParams.page as string}
totalPages={relatedEvents?.totalPages}
/>
  </section>

  </>
  )
}

export default EventDetails
