import React from 'react'
import TopBar from '@/components/Dashboard/TopBar'
import Sidebar from '@/components/Sidebar/Sidebar'
import SegwayStock from '@/components/SegwayStock/SegwayStock'
import SearchStock from '@/components/SegwayStock/SearchStock'

const page = () => {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <div className='h-auto pb-4 bg-white rounded-lg shadow'>
            <TopBar />
            <SegwayStock />
         </div>
    </main>
  )
}

export default page
