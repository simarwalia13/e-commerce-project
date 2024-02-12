import React from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
const TopNavbar = () => {
  return (
    <div>
      <div className="w-full bg-white py-4">
        <div className=" flex w-full items-center justify-around px-[100px] ">
      <div className="flex items-center  w-full border-black">
      <div className=" flex gap-x-2">
      <BiLogoFacebook size={22} />
      <FaInstagram  size={22}/>
      <TiSocialTwitter  size={23}/>
      </div>
  
      
    </div>

    <div className="flex items-center gap-x-5 ">
  <div className="border-red-300 flex items-center gap-x-2">
  <IoPersonCircleSharp size={32}/>
  <button className="text-md ">Login</button>
  </div>
  <button className="flex gap-x-2">
  <IoMdCart size={28}/>
  <div className="">0</div>
  </button>
  </div>
  </div>
      </div>
    </div>
  )
}

export default TopNavbar
