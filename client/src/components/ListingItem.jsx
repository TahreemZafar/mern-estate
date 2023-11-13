import React from 'react'
import { Link } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi';
import { LiaBedSolid } from 'react-icons/lia';
import { PiBathtubBold } from 'react-icons/pi';

const ListingItem = ({ listing }) => {
  return (
    <div className='bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden w-full md:w-[340px] lg:[w-360px]  '>

          
        <Link  to={`/listing/${listing._id}`}> 

           <img src={listing.imageUrls[0] || 'https://i.pinimg.com/736x/db/68/6d/db686d6737108e7570890b283b1b9d1d.jpg' } alt="Listing houses images cover" className='h-[280px] sm:h-[300px] md:h-[220px] w-full object-cover hover:scale-105 border border-gray-400 transition-scale duration-300 ' />

           <div className='p-3 pt-5 flex flex-col w-full border border-gray-300 border-b-0'>

              <h1 className='text-xl font-semibold line-clamp-1'>{listing.name}</h1>

              <div className='flex flex-row items-center gap-2 mt-2'>

                 <HiLocationMarker className='h-5 w-5 text-green-700' />

                 <p className='font-normal line-clamp-1 text-md text-gray-500'>{listing.address}</p>

              </div>

              <p className='line-clamp-2 my-4 '>{listing.description}</p>


              <hr className='border-gray-300' />


               <div className='flex flex-row gap-6 mt-3 mb-2 items-center text-sm font-medium'>

                  <div className='flex flex-row gap-2 items-center'>
                 <LiaBedSolid size={22} className='text-md text-gray-600' />

                 { listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }

                 </div>


                 <div className='flex flex-row gap-2 items-center'>
                   
                 <PiBathtubBold size={22} className='text-md text-gray-600' />

                 { listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom` }

                 </div>

               </div>

           </div>
        
        </Link>

    </div>
  )
}

export default ListingItem