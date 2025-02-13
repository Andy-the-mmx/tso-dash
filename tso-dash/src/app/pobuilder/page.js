import React from 'react'
import Pobuilder from '@/components/Pobuilder/Pobuilder'
import TopBar from '@/components/Dashboard/TopBar'
import Sidebar from '@/components/Sidebar/Sidebar'

const page = () => {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <div className='bg-white rounded-lg pb-4 shadow h-[200vh]'>
            <TopBar />
            <Pobuilder />
         </div>
    </main>
  )
}

export default page
