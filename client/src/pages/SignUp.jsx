
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.id]: e.target.value,

      })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      setLoading(true);

      const res = await fetch("/api/auth/sign-up",
         {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         }
      );
      const data = await res.json();
  
      if (data.success === false) {
          setError(data.message);
          setLoading(false); 
          return;
      }
  
      setLoading(false);
      setError(null);

      navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

    
  }

  

  return (
    <div className="p-3 max-w-md mx-auto lg:max-w-lg">
         <h1 className="text-3xl text-center font-semibold my-12">Create an Account</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <input type="text" placeholder="Username" className="border-2 p-3" id="username" onChange={handleChange} />
             <input type="text" placeholder="Email" className="border p-3" id="email" onChange={handleChange} />
             <input type="password" placeholder="Password" className="border p-3" id="password" onChange={handleChange} />
             <div className="flex flex-col sm:flex-row gap-4 mx-auto items-center">
               <OAuth color="bg-sky-600" />
             <button disabled={loading} className="bg-cyan-600 text-white font-medium w-80 sm:w-36 sm:mt-5 p-4 sm:p-3 rounded-lg hover:opacity-80 disabled:opacity-50"> { loading ? "loading..." : "Sign Up" }</button>
             </div>
         </form>

         {error && <p className="text-red-500 mt-5 text-center">{error}</p> }

         <div className="flex flex-row gap-2 mt-5 justify-center items-center">
             <p>Already have an Account?</p>
             <Link to="/sign-in">
                <span className="text-blue-700 font-semibold text-lg hover:underline"> Sign In</span>
              </Link>
         </div>

    </div>
  )
}

export default SignUp
