import React from 'react'
import { topMostNavbarData } from './Data'

const TopMostNavbar = () => {
  return (
    <div>
      <div className="w-full ">
        <div className="flex justify-around">
       {topMostNavbarData?.map((elm)=>   ( <button className="border-r-[1px] border-white bg-teal-900 w-full text-white py-[6px] ">
       <div className="">{elm?.discount}</div>
       </button>))}
        </div>
      </div>
    </div>
  )
}

export default TopMostNavbar
