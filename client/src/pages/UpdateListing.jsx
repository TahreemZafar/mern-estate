import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import {useSelector} from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {

      const {currentUser} = useSelector(state => state.user);
      const navigate = useNavigate();
      const params = useParams();

    const [files, setfiles] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name:'',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [uploadError, setUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

     console.log(files);


     useEffect(() => {

        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);

            const data = await res.json();

            if (data.success === false) {
                 console.log(data.message);
                 return;
            }

            setFormData(data);
        }

        fetchListing();

     },[])


     const handleImageSubmit =  (e) => {
         if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setUploadError(false);
            const promises = [];

            for ( let i = 0; i < files.length; i++ ) {
                promises.push(storeImage(files[i]));
            }

             Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setUploadError(false);
                setUploading(false);

            }).catch((error) => {
                setUploadError(`Failed while uploading Images  (max 2 mb per image)`);
                setUploading(false);
            } )
         } else {
            setUploadError('You can only upload 6 images!');
            setUploading(false);
         }
     };


     const storeImage = async (file) => {
         return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                   (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                      console.log(`Uploading ${progress} % done`);
                   },
                 (error) => {
                    reject(error);
                 },

                 () => {
                     getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
                         resolve(downloadurl);
                     } )
                 }
            )
         } )
     };


     const handleRemoveImage = (index) => {
         setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
         });
     };


     const handleChange = (e) => {

         if (e.target.id === 'sale' || e.target.id === 'rent') {
               setFormData({
                  ...formData,
                  type: e.target.id
               });
         };

         if (e.target.id ==='furnished' || e.target.id === 'parking' || e.target.id === 'offer') {

             setFormData({
                ...formData,
                [e.target.id]: e.target.checked
             });
         }

         if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea' ) {

            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
         };

     };


     const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (formData.imageUrls < 1) return setError('You must have atleast one image.')

            if (+formData.regularPrice < +formData.discountPrice) return setError('Discount Price must be less than Regular price.')

            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });

            const data = await res.json();
            setLoading(false);

            navigate(`/listing/${data._id}`);
            if (data.success === false) {
                setError(data.message)
            }

            
        } catch (error) {
            setError(error.message);
            setLoading(false);
            
        }
     } 



  return (
    <main className="p-2 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-8 mb-11">
        Update your Listing.
      </h1>

      <form className="flex flex-col sm:flex-row p-3 gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name..."
            className="border-2 p-3 "
            id="name"
            maxLength={62}
            minLength={8}
            required
            onChange={handleChange}
            value={formData.name}
          />

          <input
            type="text"
            placeholder="address..."
            className="border-2 p-3 "
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <textarea
            type="text"
            placeholder="description..."
            rows={3}
            className="border-2 p-3 "
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <div className="p-4 flex gap-6 flex-wrap justify-center">
            <div className=" flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={formData.type === 'sale'} />
              <span className="font-medium">Sell</span>
            </div>

            <div className=" flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={formData.type === 'rent'} />
              <span className="font-medium">Rent</span>
            </div>

            <div className=" flex gap-2">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={formData.parking} />
              <span className="font-medium">Parking Spot</span>
            </div>

            <div className=" flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={formData.furnished} />
              <span className="font-medium">Furnsihed</span>
            </div>

            <div className=" flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange}
              checked={formData.offer} />
              <span className="font-medium">Offer</span>
            </div>
          </div>

          <div className="flex justify-start gap-3 px-5 py-2 flex-wrap mb-2">
            <div className="flex items-center gap-2 pr-3">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="12"
                required
                className="p-3 border-2"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2 pr-3">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border-2"
                onChange={handleChange}
                value={formData.bathrooms}

              />
              <p>Bathrooms</p>
            </div>

            <div className="flex items-center gap-2 pr-3">
              <input
                type="number"
                id="regularPrice"
                min={50}
                max={100000}
                required
                className="p-3 border-2 w-24"
                onChange={handleChange}
                value={formData.regularPrice}
              />

              <div className="flex flex-col">
                <p>Regular Price</p>
                <span className="text-xs">( $ / month ) </span>
              </div>
            </div>

            { formData.offer && (
                 
                 <div className="flex items-center gap-2 pr-3">
                 <input
                   type="number"
                   id="discountPrice"
                   required
                   className="p-3 border-2 w-24"
                   min={0}
                   max={100000}
                   onChange={handleChange}
                   value={formData.discountPrice}
                 />
                 <div className="flex flex-col">
                   <p>Discounted Price</p>
                   <span className="text-xs">( $ / month ) </span>
                 </div>
               </div>
            ) }

          
          </div>
        </div>

            <div className="sm:w-0.5 mt-6 sm:h-80 bg-gray-300 ml-2" />
        <hr className="border-gray-500" />

        <div className="flex flex-col flex-1">
          <div className="flex flex-col items-center py-2 justify-center">
            <h3 className="font-semibold text-xl pb-2">Images</h3>
            <span className="text-center">The first image will be the cover (maximum 6).</span>
          </div>

          <div className="flex gap-4 pt-5 ">
            <input
              onChange={(e) => setfiles(e.target.files) }
              type="file"
              id="images"
              accept="image/*" multiple
              className="p-3 border border-gray-400 w-full py-4"
            />

            <button disabled={uploading} type="button" onClick={handleImageSubmit} className="p-3 text-cyan-500 border-2 font-medium py-3 border-cyan-500 uppercase hover:shadow-lg disabled:opacity-50">
              { uploading ? "Uploading..." : "Upload" }
            </button>
          </div>

          <p className="text-center mt-2 text-red-600"> {uploadError && uploadError} </p>

          { 
             formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                 <div key={index} className="flex flex-row items-center justify-between sm:px-3  px-3  border border-gray-300 m-2">
                    <img src={url} alt="uploaded images" className="w-48 h-40 sm:w-28 sm:h-24 object-contain rounded-lg" />
                     
                    <button type="button" onClick={() => handleRemoveImage(index)} className="bg-red-700 text-white font-medium p-2 w-24 h-10 my-4 hover:opacity-80 hover:cursor-pointer">Delete</button>
                 </div>
             )
            )
          }

           <button disabled={loading || uploading}  className="p-4 bg-sky-600 font-semibold text-lg cursor-pointer hover:opacity-80 disabled:opacity-50 hover:shadow-lg text-white
           mx-1 mt-7">      
              { loading ? 'Creating...' : 'Update Listing' }
           </button>

           { error && <p className="text-red-600 text-center mt-3 font-medium">{error}</p> }

        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
