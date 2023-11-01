import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";


const Profile = () => {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [fileErr, setFileErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  console.log(formData);

  const fileRef = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileErr(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  const handleDelete = async () => {
    try {

      dispatch(deleteUserStart());

      const res = await fetch(`api/user/delete/${currentUser._id}`, {
         method: 'DELETE',
      });

      const data = await res.json();

      if (data.success === false) {
         
         dispatch(deleteUserFailure(data.message)); 
        
         return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  const signOut = async () => {
      try {

        dispatch(signOutUserStart());

        const res = await fetch('/api/auth/sign-out');

        const data = await res.json();

        if(data.success === false) {
          dispatch(signOutUserFailure(data.message));
        }

        dispatch(signOutUserSuccess(data));
        
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
  }



  return (
    <div className="p-3 max-w-md mx-auto lg:max-w-lg">
      <h1 className="text-3xl text-center font-semibold mt-8 mb-6">
        Profile Page
      </h1>
      <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full h-24 w-24 lg:w-32 lg:h-32 object-cover self-center cursor-pointer"
          alt=""
        />

        <p className=" self-center font-medium">
          {fileErr ? (
            <>
              <span className="text-red-600">
                An error occured while uploading your image!.{" "}
              </span>
              <br />
              <span className="self-center pl-12 text-red-500">
                Image must be less than (2 mb).
              </span>
            </>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}% done.`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">
              Image is successfully uploaded!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          className="border-2 p-3"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3"
          id="password"
          onChange={handleChange}
        />
        <div className="flex flex-row gap-4 mx-auto items-center">
          <button
            disabled={loading}
            className="bg-cyan-600 text-white font-medium w-32 mt-5 p-3 rounded-lg hover:opacity-80 disabled:opacity-50"
          >
            {" "}
            {loading ? "loading..." : "Update"}{" "}
          </button>

           <Link to={"/create-listing"}>
          <button className="bg-sky-600 text-white font-medium w-48 mt-5 p-3 rounded-lg hover:opacity-80 disabled:opacity-50">
            {" "}
            Create Listing
          </button>
          </Link>


        </div>
      </form>

      <p className="text-red-600 mt-4 mb-3 font-medium text-center">
        {" "}
        {error && error}{" "}
      </p>
      <p className="text-green-600 mt-4 mb-3 font-medium text-center">
        {" "}
        {updateSuccess ? "Successfully Updated!" : ""}{" "}
      </p>

      <hr className="h-0.5 bg-slate-400" />

      <div className="text-center mt-8 sm:space-x-6 sm:ml-8 lg:ml-14  flex flex-col sm:flex-row gap-y-4">
        <span
          onClick={handleDelete}
          className="bg-red-700 text-white font-medium p-4 px-12 hover:opacity-80 hover:cursor-pointer"
        >
          Delete Account!
        </span>
        <span
         onClick={signOut}
         className="bg-rose-500 text-white font-medium p-4 px-8 hover:opacity-80 hover:cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
