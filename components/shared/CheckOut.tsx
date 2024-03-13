import { useEffect } from 'react';
import { IEvent } from '@/mongodb/database/models/event.model'
import { Button } from '../ui/button'
import {loadStripe} from '@stripe/stripe-js'
import { checkoutOrder } from '@/lib/actions/order.actions';

//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

const CheckOut = ({event,userId}:{event:IEvent,userId:string}) => {

    const onCheckOut=async()=>{
        const order={
            eventTitle:event.title,
            eventId:event._id,
            price:event.price,
            isFree:event.isFree,
            buyerId:userId
        }
        await checkoutOrder(order)
    }


    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
          }
        }, []);


  return (
<form action={onCheckOut} method="post">
<Button type='submit' role='link' size='lg' className='sm:w-fit'>
{event.isFree ? "Get Ticket":"Buy Ticket"}
</Button>

</form>
  )
}

export default CheckOut
