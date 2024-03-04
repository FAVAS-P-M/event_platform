import Image from 'next/image'
import Link from 'next/link'


const Footer = () => {
  return (
   <footer className='border-t'>
<div className='flex items-center justify-center flex-between  flex-col gap-4 p-5 text-center sm:flex-row'>
    <Link href='/'>
    <Image src='/assets/logo.svg' alt='logo'
    width={128} height={38}/>
    </Link>
    <p>2024 Eventz. All Rights Reserved</p>
</div>
   </footer>
  )
}

export default Footer
