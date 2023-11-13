import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {

  const [ searchTerm, setSearchTerm ] = useState('');

  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
     e.preventDefault();
     const urlParams = new URLSearchParams(window.location.search);
     urlParams.set('searchTerm', searchTerm);
     const searchQuery = urlParams.toString();
     navigate(`/search?${searchQuery}`);

  };



  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get('searchTerm');

    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }

  },[location.search])


  return (
    <header className=" bg-header1 shadow-xl top-0 sticky z-30">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to="/">
        <h1 className="font-bold text-md sm:text-xl flex flex-wrap">
            <span className="text-slate-500">TZ</span>
            <span className="text-slate-700">Estate.</span>
        </h1>
        </Link>

         <form onSubmit={handleSubmit} className="bg-slate-50 p-3 flex items-center shadow-sm">
             <input name="Search" type="text" placeholder="Search..."
             className="bg-transparent w-32 sm:w-40 md:w-60 lg:w-64 focus:outline-none"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
             <FaSearch className="text-slate-600" />
             </button>
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
