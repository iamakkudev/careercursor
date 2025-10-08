import React, { useState } from 'react'

const QualifyInput = () => {
  const [ qualify, setQualify] = useState([]);

  return (
    <div className="w-full flex justify-center">
      <div
      className='w-[50%] my-8 flex flex-col p-4 bg-white  rounded-4xl'
      >
        <div
        className='text-3xl font-bold mb-4 text-center text-violet-800' 
        >Qualification</div>
        <div
          className='w-[90%] bg-violet-900/70 text-2xl py-4 px-2 font-semibold tracking-wider active:bg-violet-900 mb-4 cursor-pointer rounded-2xl'
        >
          Illiterate</div>
        <div
        className='w-[90%] bg-violet-900/70 text-2xl py-4 px-2 font-semibold tracking-wider mb-4 cursor-pointer rounded-2xl'
        >Basic</div>
        <div
        className='w-[90%] bg-violet-900/70 text-2xl py-4 px-2 font-semibold tracking-wider mb-4 cursor-pointer rounded-2xl'
        >UnderGraduate</div>
        <div
        className='w-[90%] bg-violet-900/70 text-2xl py-4 px-2 font-semibold tracking-wider mb-4 cursor-pointer rounded-2xl'
        >PostGraduate</div>
        <div
        className='w-[90%] bg-violet-900/70 text-2xl py-4 px-2 font-semibold tracking-wider mb-4 cursor-pointer rounded-2xl'
        >Masters</div>
        <div
        className='w-[90%] bg-violet-900/70 text-2xl py-4 px-2 font-semibold tracking-wider mb-4 cursor-pointer rounded-2xl'
        >Additional Education</div>
      </div>
    </div>
  )
}

export default QualifyInput