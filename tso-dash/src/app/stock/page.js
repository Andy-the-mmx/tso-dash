import React from 'react'
import TopBar from '@/components/Dashboard/TopBar'
import Sidebar from '@/components/Sidebar/Sidebar'
import SegwayStock from '@/components/SegwayStock/SegwayStock'

const page = () => {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <div className='h-auto pb-4 bg-white rounded-lg shadow'>
            <TopBar />
            <div>All stock page</div>
            <div className="grid grid-cols-2">
            <SegwayStock />
            </div>
         </div>
    </main>
  )
}

export default page
