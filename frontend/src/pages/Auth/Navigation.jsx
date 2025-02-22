import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    const [dropDown,setDropDown] = useState()
    const [sidebar,setSidebar] = useState()

    // Toggle Functions
    const toggleDropDown = () => {
        setDropDown(!dropDown)
    }
    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const closeSidebar = () => {
        setSidebar(false)
    }


  return (
    <div style={{zIndex:999}} className={`${sidebar ? "hidden" : "flex" } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between bg-black text-white w-[4%] hover:w-[15%] h-[100vh] fixed p-4 `} id="navigation-container">
        <div className="flex flex-col justify-center space-y-1">
            <Link to={'/'} className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}

            </Link>
            <Link to={'/shop'} className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Shop</span>{" "}

            </Link>
            <Link to={'/cart'} className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}

            </Link>
            <Link to={'/favorites'} className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mr-2 mt-[3rem]" size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Favorites</span>{" "}

            </Link>
            
        </div>
        <ul>
            <li>
            <Link to={'/login'} className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineLogin className="mr-2 mt-[3rem]" size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}

            </Link> 
            </li>
            <li>
            <Link to={'/register'} className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}

            </Link> 
            </li>
        </ul>
    </div>
  )
}
export default Navigation