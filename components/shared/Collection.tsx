import Card from "./Card";

type CollectionProps={
    data:IEvent[],
    emptyTitle:string,
emptyStateSubtext:string,
limit:number,
page:number | string,
totalPages?:number,
urlParamName?:string,
collectionType?:'Events_Organized'| 'My_Tickets'|'All_Events'
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages=0,
    collectionType,
    urlParamName
}:CollectionProps) => {
  return (
 <>
 {data.length> 0 ? (
    <div className="flex flex-col md:flex-col ">
<ul className="grid grid-cols-1 gap-10 md:grid md:grid-cols-4  ">
{data.map((event)=>{
    const hasOrderLink=collectionType==="Events_Organized";
    const hidePrice=collectionType==="My_Tickets";
    return (
        <li key={event._id} className="flex justify-center">
<Card 
event={event}
hasOrderLink={hasOrderLink}
hidePrice={hidePrice}
/>
        </li>
    )
})}
</ul>

{data[0].title}

    </div>
 ):(
    <div className="flex-center min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
        <h3 className="p-bold-20 ">{emptyTitle}</h3>
        <p>{emptyStateSubtext}</p>
    </div>
 )}
 </>
  )
}

export default Collection
