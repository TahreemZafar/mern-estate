import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className=" bg-header1 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to="/">
        <h1 className="font-bold text-md sm:text-xl flex flex-wrap">
            <span className="text-slate-500">TZ</span>
            <span className="text-slate-700">Estate.</span>
        </h1>
        </Link>

         <form className="bg-slate-50 p-3 flex items-center shadow-sm">
             <input type="text" placeholder="Search..."
             className="bg-transparent w-32 sm:w-64 focus:outline-none" />
             <FaSearch className="text-slate-600" />
         </form>

           <ul className="flex gap-4 font-medium">
             <Link to="/">
             <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li>
             </Link>
             <Link to="/about">
             <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">About</li>
             </Link>
             <Link to='/sign-in'>
             <li className="text-slate-700 hover:underline cursor-pointer">Sign In</li>
             </Link>
             
           </ul>

         </div>
    </header>
  )
}

export default Header
