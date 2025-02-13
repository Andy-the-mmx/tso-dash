'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FiCommand } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { CommandMenu } from './CommandMenu';

const Search = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
        <div className='bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm'>
            <FaSearch className='mr-2' />
            <input 
            onFocus={(e) =>{
                e.target.blur();
                setOpen(true);
            }}
            type='text'
            placeholder='Search'
            className='w-full bg-transparent placeholder:test-stone-400 focus:outline-none'
            />
            <span className="absolute flex items-center gap-0 p-1 text-xs -translate-y-1/2 rounded shadow 5 bg-stone-50 right-1 top-1/2">
            <FiCommand />K
            </span>
        </div>

        <CommandMenu open={open} setOpen={setOpen} />
    </>

  )
}

export default Search
