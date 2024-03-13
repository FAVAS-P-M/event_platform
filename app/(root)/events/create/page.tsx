import EventForm from '@/components/shared/EventForm'
import {auth} from '@clerk/nextjs'

const CreateEvent = () => {
const {sessionClaims} =auth()

const userId=sessionClaims?.userId as string;


  return (
    <>
   <section className='bg-blue-50 bg-cover bg-center py-5 md:py-10 '>
<h3 className=' flex flex-wrap text-center justify-center font-extrabold'>Create Events</h3>
   </section>

<div>
<EventForm userId={userId} type="Create" />
</div>
</>
  )
}

export default CreateEvent
