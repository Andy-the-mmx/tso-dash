import React from 'react'
import LogOut from './LogOut'
import Search from './Search'
import RouteSelect from './RouteSelect'

const Sidebar = () => {
  return (
    <div>
      <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
        {/*TODO: Main sidebar content */}
        <LogOut />
        <Search />
        <RouteSelect />
      </div>
        {/*TODO: Log out */}
    </div>
  )
}

export default Sidebar
