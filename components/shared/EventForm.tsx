'use client'

import { eventFormSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import Dropdown from './Dropdown'
import { Textarea } from "@/components/ui/textarea"
import {FileUploader} from './FileUploader'
import { useState } from "react"
import Image from "next/image"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import {useUploadThing} from '@/lib/uploadthing'
import { Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import {IEvent} from '@/mongodb/database/models/event.model'


const eventDefaultValues={
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}
 


type EventFormProps={
    userId:string
    type:"Create"|"Update"
    event?:IEvent,
    eventId?:string
}

const EventForm = ({userId,type,event,eventId}:EventFormProps) => {
const [files,setFiles]=useState<File[]>([])

const router=useRouter()

    const initialValues= event && type==="Update" ? {...event,startDateTime:new Date(event.startDateTime),endDateTime:new Date(event.endDateTime)} : eventDefaultValues;

    const {startUpload}=useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
      })
     
      // 2. Define a submit handler.
    async  function onSubmit(values: z.infer<typeof eventFormSchema>) {
  const eventData=values;
  let uploadedImageUrl=values.imageUrl;
  if(files.length>0){
    const uploadedImages=await startUpload(files)
    if(!uploadedImages){
        return
    }
    uploadedImageUrl=uploadedImages[0].url
  }
  if(type=== "Create"){
    try {
      const newEvent=await createEvent({
        event:{...values,imageUrl:uploadedImageUrl},
        userId,
        path:'/profile'
      })  
      if(newEvent){
        form.reset()
      router.push(`/events/${newEvent._id}`)
      }
    } catch (error) {
        console.log(error)
    }
  }

  if(type=== "Update"){
    if(!eventId){
      router.back()
      return;
    }
    try {
      const updatedEvent=await updateEvent({
        userId,
        event:{...values,imageUrl:uploadedImageUrl,_id:eventId},
      
        path:`/events/${eventId}`
      })  
      if(updatedEvent){
        form.reset()
      router.push(`/events/${updatedEvent._id}`)
      }
    } catch (error) {
        console.log(error)
    }
  }

      }
 
 
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 px-4 py-2">
          
          <div className="flex flex-col gap-5 md:flex-row ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                  <Input placeholder="Event Title" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                  <Dropdown 
                  onChangeHandler={field.onChange}
                  value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
</div>

<div className="flex flex-col gap-5 mnd:flex-row">
<FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl className="h-72">
                  <Textarea placeholder="description" {...field} className="rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full flex items-center justify-center">
              
                <FormControl className="h-72">
                  <FileUploader onFieldChange={field.onChange}
                  imageUrl={field.value} 
                  setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                    <div className="flex flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 justify-center items-center px-5">
                        <Image src='/assets/location-grey.svg' alt='calender' width={24} height={24}/>
                        <Input placeholder="Event location or online" {...field} className="" />

                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          </div>

          <div className="flex flex-col h-[120px] gap-5  md:flex-row ">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                    <div className="flex justify-between md:flex md:justify-between  w-full overflow-hidden rounded-full bg-gray-50 px-5">
                        <Image src='/assets/calendar.svg' alt='calender' width={24} height={24}/>
                        <p className="">Start Date</p>
                        <ReactDatePicker 
                        selected={field.value}
                         onChange={(date:Date) => field.onChange(date)}
                       showTimeSelect
                        timeInputLabel="Time:" 
                        dateFormat="MM/dd/yyy h:mm aa"

                         />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

 

     
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                    <div className="flex  justify-between  w-full overflow-hidden rounded-full bg-gray-50 px-5">
                        <Image src='/assets/calendar.svg' alt='calender' width={24} height={24}/>
                        <p className="">End Date</p>
                        <ReactDatePicker 
                        selected={field.value}
                         onChange={(date:Date) => field.onChange(date)}
                       showTimeSelect
                        timeInputLabel="Time:" 
                        dateFormat="MM/dd/yyy h:mm aa"
                        
                         />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         </div>

        <div className="flex flex-col gap-5 md:flex-row">

        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                    <div className="flex  justify-between items-center  w-full overflow-hidden rounded-full bg-gray-50 px-5">
                        <Image src='/assets/dollar.svg' alt='dollar'
                         width={24} height={24}/>
                        <Input type="number" 
                        placeholder="Price"
                        {...field}
                        className="p-16 border-0 bg-gray-50 focus-visible:ring-0 peer-focus-visible:ring-offset-0" />

<FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
              
                <FormControl>
                    <div className="flex items-center">
                       <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                 <Checkbox onCheckedChange={field.onChange}
                 checked={field.value} id="isFree"
                 className="mr-2 h-5 w-5 border-2 border-blue-500 "
                  />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
              
                <FormControl>
                    <div className="flex flex-center justify-center items-center h-[140px] w-full overflow-hidden rounded-full bg-gray-50 px-5">
                        <Image src='/assets/link.svg' alt='link' width={24} height={24}/>
                        <Input placeholder="URL" {...field} className="" />

                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />




        </div>
        
        <Button 
        type="submit" 
        size='lg'
        disabled={form.formState.isSubmitting}
        className="button col-span-2 w-full"
        >{form.formState.isSubmitting ? ('Submitting...'):`${type} Event`}</Button>
        </form>
      </Form>
  )
}

export default EventForm
