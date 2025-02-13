import React from 'react';
import { Command } from 'cmdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiSpreadsheet } from "react-icons/bi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsBoxes } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { CiLogout } from 'react-icons/ci'



export const CommandMenu = ({open,setOpen,}) => {
    const [value, setvalue] = useState('')

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className='fixed inset-0 bg-stone-950/50' onClick={() => setOpen(false)}>
        <div onClick={(e) => e.stopPropagation()} className='w-full max-w-lg mx-auto mt-12 overflow-hidden bg-white border rounded-lg shodow-xl border-stone-300'>
        <Command.Input 
        value={value}
        onValueChange={setvalue}
        placeholder='What are you looking for?' className='relative w-full p-3 text-lg border-b border-stone-300 placeholder:text-stone-400 focus:outline-none'/>
        <Command.List className='p-3'>
        <Command.Empty>No results found for {" "} <span className='text-red-500'>{value}</span></Command.Empty>

        <Command.Group heading="Actions" className='mb-3 text-sm text-stone-300'>
          <Command.Item className='flex items-center gap-2 p-2 text-lg transition-colors rounded cursor-pointer text-stone-950 hover:bg-stone-200'>
            <BiSpreadsheet />
             PO builder
          </Command.Item>
          <Command.Item className='flex items-center gap-2 p-2 text-lg transition-colors rounded cursor-pointer text-stone-950 hover:bg-stone-200'>
          <LuFileSpreadsheet />
            ASN Builder
          </Command.Item>
          <Command.Item className='flex items-center gap-2 p-2 text-lg transition-colors rounded cursor-pointer text-stone-950 hover:bg-stone-200'>
             <BsBoxes />
            Stock Control
          </Command.Item>
          <Command.Item className='flex items-center gap-2 p-2 text-lg transition-colors rounded cursor-pointer text-stone-950 hover:bg-stone-200'>
            <MdAddShoppingCart />
            Add new product
          </Command.Item>
          <Command.Item className='flex items-center gap-2 p-2 text-lg transition-colors rounded cursor-pointer text-stone-950 hover:bg-stone-200'>
            <TbReportSearch />
            View reports
          </Command.Item>
        </Command.Group>
        <Command.Item className='flex items-center gap-2 p-2 text-lg text-white transition-colors rounded cursor-pointer bg-stone-950 hover:bg-stone-700'>
            <CiLogout />
            Sign Out
          </Command.Item>
      </Command.List>
        </div>   
    </Command.Dialog>
  )
}