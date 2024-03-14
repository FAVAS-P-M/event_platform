"use client"

import { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useSearchParams,useRouter } from 'next/navigation'

import {Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue} from '../ui/select'
import { getAllCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/mongodb/database/models/category.model'

const CategoryFilter = () => {
    const [categories,setCategories]=useState<ICategory[]>([])
    const searchParams=useSearchParams()
    const router=useRouter()

    useEffect(() => {
        const getCategories = async () => {
          const categoryList = await getAllCategories();
    
          categoryList && setCategories(categoryList as ICategory[])
        }
    
        getCategories();
      }, [])



const onSelectCategory=(category:string)=>{
    let newUrl = '';

    if(category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
}

  return (
<Select onValueChange={(value:string)=>onSelectCategory(value)} >
  <SelectTrigger className=" flex flex-center min-h-[54px] w-full bg-gray-50 rounded-full overflow-hidden md:w-1/2" >
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem className='' value="All">All Categories</SelectItem>
{categories.map((category)=>(
   <SelectItem value={category.name} 
   key={category._id}
   className='select-item p-regular-14'
   >{category.name}</SelectItem> 
))}
  </SelectContent>
</Select>

  )
}

export default CategoryFilter
