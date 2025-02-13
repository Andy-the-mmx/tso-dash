'use client'
import React, { useState, useEffect } from 'react';

const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

const TopBar = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    // Update the date every second
    const intervalId = setInterval(() => {
      setCurrentDate(getDate());
    }, 1000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentDate]);
    return (
    <div className='px-4 pb-4 mt-2 mb-4 border-b border-stone-200'>
        <div className="flex flex-col items-start p-0.5">
            <span className="block text-sm font-bold">
                Good Morning Techsales
            </span>
            <span className="block text-sm text-stone-500">
                {currentDate}
            </span>
        </div>
    </div>
  )
}

export default TopBar
