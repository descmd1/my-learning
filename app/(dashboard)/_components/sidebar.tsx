import React from 'react'
import Logo from './logo'
import SidebarRoutes from './sidebar-routes'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-white h-full border-r overflow-y-auto shadow-sm'>
      <div className='p-6'>
<Logo/>
      </div>
      <div className='flex flex-col w-full'>
<SidebarRoutes/>
      </div>
        </div>
  )
}

export default Sidebar