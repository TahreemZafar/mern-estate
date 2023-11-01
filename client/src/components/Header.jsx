import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const { currentUser } = useSelector(state => state.user)

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
             className="bg-transparent w-32 sm:w-40 md:w-60 lg:w-64 focus:outline-none" />
             <FaSearch className="text-slate-600" />
         </form>

           <ul className="flex gap-4 font-medium items-center">
             <Link to="/">
             <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li>
             </Link>
             <Link to="/about">
             <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">About</li>
             </Link>

             { currentUser ? (
                    <Link to='/profile'> 
                        <img src={currentUser.avatar} className="rounded-full w-9 h-9 lg:w-10 lg:h-10 object-cover" alt="Profile Image" />
                    </Link>
             ) : (
                
             <Link to='/sign-in'>
             <li className="text-slate-700 hover:underline cursor-pointer">Sign In</li>
             </Link>
             
             ) }

           </ul>

         </div>
    </header>
  )
}

export default Header
