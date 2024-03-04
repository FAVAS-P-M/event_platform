"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"


const headerLinks=[
    {
        label:'Home',
        route:'/'
    },
    {
        label:'Create Event',
        route:'/events/create'
    },
    {
        label:'My Profile',
        route:'/profile'
    },
]

const NavItems = () => {
const pathname=usePathname()

  return (

      <ul className=' flex  w-full flex-col items-start gap-5 md:flex-row'>
{headerLinks.map((link)=>{
   
    const isActive=pathname===link.route;
    return (
    <li key={link.route} className={`${isActive && 'text-blue-500'} flex-centre p-medium-16 whitespace-nowrap`}>
<Link href={link.route}>{link.label}</Link>
    </li>
    )
})}
      </ul>

  )
}

export default NavItems
