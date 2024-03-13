import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const events=await getAllEvents({
    query:'',
    category:'',
    page:1,
    limit:6
  })



  return (
<>
<section className="bg-blue-50 bg-contain py-5 md:py-10 w-full justify-center align-middle text-center">
<div className=" flex-wrap grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
<div className="flex flex-col justify-center gap-8">
<h1 className="text-4xl font-extrabold">Celebrate Your Events With Us</h1>
<p className="p-20 md:p-24">Check and find out the existing and upcoming events <span className="text-orange-500">nearby</span> you and celebrate with your family!</p>
<Button size="lg" asChild className=" w-full  sm:w-fit rounded-xl md:m-4  ">
  <Link href='#events'>Explore Now</Link>
</Button>
</div>

<Image src='/assets/hero.jpg' 
alt='hero'
width={1000}
height={1000}
className="max-h-[50vh] rounded-lg object-contain object-center 2xl:max-h-[50vh]"
/>
</div>
</section>


<section id="events" className="my-8 flex flex-col gap-8 md:gap-12 px-4 ">
<h2 className="text-xl font-bold">Trusted By <br/> Thousands of events</h2>
<div className="flex w-full flex-col gap-5 md:flex-row ">
search
Category Filter
</div>

<div className=" grid grid-cols-1 md:grid-cols-1">
<Collection
data={events?.data}
emptyTitle="No Events Found"
emptyStateSubtext="Come Back Later"
collectionType="All_Events"
limit={6}
page={1}
totalPages={2}
/>
</div>
</section>


</>
  );
}
