import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FaMapMarkerAlt,
  FaShare,
} from 'react-icons/fa';
import { LuParkingCircle, LuSofa } from 'react-icons/lu';
import { PiBathtubBold } from 'react-icons/pi';
import { LiaBedSolid } from 'react-icons/lia';
import Contact from '../components/Contact';


// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px] border-b-2 border-spacing-6 border-gray-600'
                  style={url ? {
                    background: `url(${url} ) center no-repeat`,
                    backgroundSize: 'cover',
                    
                  } : {
                    backgroundImage: url('https://i.pinimg.com/736x/db/68/6d/db686d6737108e7570890b283b1b9d1d.jpg')
                  }  
                }
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[20%] right-[2%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-7 my-5 gap-4'>


            <div className='flex flex-col sm:flex-row items-center justify-between gap-10 gap-y-8 mb-3'>
            <p className='text-2xl font-semibold flex-wrap'>
              {listing.name}
              </p>

              <span className='bg-sky-600 p-3 py-4 text-center text-white w-40 mr-5'>
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}

              </span>

              </div>

              
          
            <span className='flex mt-2 gap-2 bg-teal-600 p-3 pr-6 text-white max-w-max'>
              <FaMapMarkerAlt size={23} className='text-gray-100' />
              {listing.address}
            </span>

            <div className='flex gap-4 mt-2'>
              <p className='border-4 border-cyan-600 w-full max-w-[130px] text-cyan-600 text-center p-3 font-medium text-lg'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='hover:bg-sky-300 border-2 border-black w-full max-w-[150px]
                 text-black text-center p-3 py-4 font-medium '>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
           
            <p className=' text-lg font-normal mt-5 '>
              
              {listing.description}
            </p>


            <ul className='text-gray-800 font-semibold text-sm flex flex-wrap items-center mt-0 gap-5 sm:gap-4 mb-10'>
              <li className='flex items-center gap-2 whitespace-nowrap border border-gray-800 p-4 px-5 hover:bg-sky-200'>
                <LiaBedSolid size={24} className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap border border-gray-800 p-4 px-5 hover:bg-sky-200'>
                <PiBathtubBold size={24} className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms `
                  : `${listing.bathrooms} bathroom `}
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap border border-gray-800 p-4 px-5 hover:bg-sky-200'>
                <LuParkingCircle size={24} className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap border border-gray-800 p-4 px-5 hover:bg-sky-200'>
                <LuSofa size={24} className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            <hr className="border-gray-500 mr-14 sm:mr-28 lg:mr-36" />

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-cyan-600 w-80 self-center text-white text-lg font-semibold mt-5 hover:opacity-80 p-5'
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}