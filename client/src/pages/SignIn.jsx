
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.id]: e.target.value,

      })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
       dispatch(signInStart());

      const res = await fetch("/api/auth/sign-in",
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
           dispatch(signInFailure(data.message));
          return;
      }
  
        dispatch(signInSuccess(data));

      navigate('/');

    } catch (error) {
        dispatch(signInFailure(error.message));
    }
    
  }


  console.log(formData);

  return (
    <div className="p-3 max-w-md mx-auto lg:max-w-lg">
         <h1 className="text-3xl text-center font-semibold my-12">Log In</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <input type="text" placeholder="Email" className="border p-3" id="email" onChange={handleChange} />
             <input type="password" placeholder="Password" className="border p-3" id="password" onChange={handleChange} />
           
             <div className="flex flex-col sm:flex-row gap-4 mx-auto items-center">
               <OAuth color="bg-cyan-600" />
             <button disabled={loading} className="bg-sky-600 text-white font-medium w-80 sm:w-36 sm:mt-5 p-4 sm:p-3 rounded-lg hover:opacity-80 disabled:opacity-50"> { loading ? "loading..." : "Sign In" }</button>
             </div>
         </form>

          <p className="text-red-500 mt-5 text-center">{error ? error : '' }</p> 

         <div className="flex flex-row gap-2 mt-5 justify-center items-center">
             <p>Don't have an Account?</p>
             <Link to="/sign-up">
                <span className="text-blue-700 font-semibold text-lg hover:underline"> Sign Up</span>
              </Link>
         </div>

    </div>
  )
}

export default SignIn
