import React from 'react'
import Image from 'next/image';
import { CiLogout } from 'react-icons/ci'

const LogOut = () => {
  return (
    <div className='pb-4 mt-2 mb-4 border-b border-stone-300'>
        <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center'>
            <img
                src='https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Caleb' 
                alt='avatar'
                className='bg-red-500 rounded shadow size-8 shrink-0'
            />
            <div className="text-start">
                <span className="block text-sm font-semibold">Techsales Online</span>
                <span className="block text-sm text-stone-500">
                    Log Out
                </span>
            </div>
            <CiLogout className='absolute text-lg right-2 top-1/2' />
        </button>
    </div>
  )
};

export default LogOut
