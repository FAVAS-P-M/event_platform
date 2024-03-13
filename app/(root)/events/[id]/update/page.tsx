import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions'
import { UpdateEventParams } from '@/types';
import {auth} from '@clerk/nextjs'

type UpdateEventProps={
  params:{
    id:string
  }
}

const UpdateEvent =async ({params:{id}}:UpdateEventProps) => {
  const event=await getEventById(id);
const {sessionClaims} =auth()

const userId=sessionClaims?.userId as string;


  return (
    <>
   <section className='bg-blue-50 bg-cover bg-center py-5 md:py-10 '>
<h3 className=' flex flex-wrap text-center justify-center'>Update Events</h3>
   </section>

<div>

<EventForm  type="Update"
 event={event}
 userId={userId}
 eventId={event._id} />
</div>
</>
  )
}

export default UpdateEvent