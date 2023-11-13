import { Link } from 'react-router-dom';
import img from '/a.jpg';
import { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import ListingItem from '../components/ListingItem';
import { BsArrowRight } from 'react-icons/bs';
import Footer from '../components/Footer';


const Home = () => {

      SwiperCore.use([Navigation]);

   const [ offerListings, setOfferListings ] = useState([]);
   const [ saleListings, setSaleListings ] = useState([]);
   const [ rentListings, setRentListings ] = useState([]);

    console.log(saleListings);

    

     useEffect( () => {

        const fetchOfferListings = async () => {

           try {

              const res = await fetch( '/api/listing/get?offer=true&limit=4' );

              const data = await res.json();

              setOfferListings(data);

              fetchRentListings();
            
           } catch (error) {
              console.log(error);
           }

        }


        const fetchRentListings = async () => {

            try {

                 const res = await fetch('/api/listing/get?type=rent&limit=4');

                 const data = await res.json();

                 setRentListings(data);

                 fetchSaleListings();
              
            } catch (error) {
              console.log(error);
            }

        }


        const fetchSaleListings = async () => {

            try {

                const res = await fetch( '/api/listing/get?type=sale&limit=4' );

                const data = await res.json();

                setSaleListings(data);

              
            } catch (error) {
               console.log(error);
            }

        }


        fetchOfferListings();

     },[] )



  return (

    <div>

       {/*   Header    */}

          <div style={{
             backgroundImage: `url(${img})`,
             backgroundRepeat: 'no-repeat',
             backgroundSize: "cover",
             position: 'relative',
             opacity: '22%'

          }} className="w-full h-[400px] lg:h-[450px] flex border-b-2 border-black">

          </div>

          
        <div className='absolute px-3 flex flex-col top-14 sm:top-20 lg:top-24 items-center text-center w-full'>

          <h1 className='mt-20 text-black font-bold text-[28px] md:text-3xl xl:text-[34px]'>Find your next <span className='text-sky-600'>Ideal</span> place with <br /> satisfaction and ease. </h1>

        <div className='mt-4 font-semibold text-md xl:text-lg text-gray-800'>TZ Estate will help you find your home fast, easy and comfortable. <br />
              Our expert support is always available.</div>


           <Link to={'/search'} className='bg-sky-500 px-8 xl:px-10 py-4 mb-5 text-center border border-gray-600 hover:opacity-80 hover:shadow-lg text-white font-medium mt-7' >Let's Start now..</Link>

          </div>

         

       {/*     Slider      */}


       <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px] border-y-2 border-gray-600'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


      {/*     Listings        */}


      <div className='max-w-6xl  mx-auto p-3 flex flex-col gap-8 my-10'>

          { 
             rentListings && rentListings.length > 0 && (

                 <div>

                   <div className='flex flex-col items-center justify-center mt-8 gap-2 '>

                       <h2 className='text-[28px] font-semibold text-center'>Renting Properties.</h2>

                       <Link to={'/search?type=rent'} className='flex flex-row  gap-4 bg-cyan-500 mt-3 mb-8 p-6 py-4 text-white font-semibold hover:shadow-lg hover:opacity-75' >Go to properties <BsArrowRight className='h-5 w-5 mt-1 text-white' /> </Link>

                       <div className=' flex flex-wrap gap-6 justify-center gap-y-8'>

                          { rentListings.map((listing) => (
                            <ListingItem listing={listing} key={listing._id} />
                          ) ) }

                       </div>

                   </div>
                   
                 </div>

             )
          }

           <hr className='mt-6 mx-16 border-gray-400' />

          
          { 
             saleListings && saleListings.length > 0 && (

                 <div>

                   <div className='flex flex-col items-center justify-center mt-4 gap-2 '>

                       <h2 className='text-[28px] font-semibold text-center'>Selling Properties</h2>

                       <Link to={'/search?type=sale'} className='flex flex-row  gap-4 bg-cyan-500 mt-3 mb-8 p-6 py-4 text-white font-semibold hover:shadow-lg hover:opacity-75' >Go to properties <BsArrowRight className='h-5 w-5 mt-1 text-white' /> </Link>

                       <div className=' flex flex-wrap gap-6 justify-center gap-y-8'>

                          { saleListings.map((listing) => (
                            <ListingItem listing={listing} key={listing._id} />
                          ) ) }

                       </div>

                   </div>
                   
                 </div>

             )
          }


          <hr className='mt-6 mx-16 border-gray-400' />



          { 
             offerListings && offerListings.length > 0 && (

                 <div>

                   <div className='flex flex-col items-center justify-center mt-4 gap-2 mb-28'>

                       <h2 className='text-[26px] font-semibold text-center'>We've got a lot of <span className='text-cyan-600 2xl' > Offer deals <br /> </span> for you to choose.</h2>

                       <Link to={'/search?offer=true'} className='bg-cyan-500 mt-3 mb-8 p-6 py-3 text-white font-semibold hover:shadow-lg hover:opacity-75' >Check them out!</Link>

                       <div className=' flex flex-wrap gap-6 justify-center gap-y-8'>

                          { offerListings.map((listing) => (
                            <ListingItem listing={listing} key={listing._id} />
                          ) ) }

                       </div>

                   </div>
                   
                 </div>

             )
          }


       

          

      </div>

      <Footer />

    </div>
  )
}

export default Home
