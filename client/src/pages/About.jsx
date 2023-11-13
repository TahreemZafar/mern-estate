import React from 'react'
import Footer from '../components/Footer'

export default function About() {
  return (

     <div>


    <div className='pt-16 px-8 max-w-5xl mx-auto items-center text-center mb-40'>

      <h1 className='text-3xl font-bold mb-7 text-gray-700'>About <span className='text-sky-600' > TZ Estate.</span></h1>


      <p className='mb-4 text-black'>TZ Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>


      <p className='mb-4 text-black'>
      Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>


      <p className='mb-14 mt-8 text-black'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>


      <hr className='mt-6 mx-16 border-gray-400' />



         <div className=' mt-12 gap-2 flex flex-col items-end text-center justify-end mr-10 mb-20'>
             <p className='text-lg font-medium'>Built By: <span className='text-xl font-bold text-cyan-600'>Tahreem Zafar.</span></p>
              <span className='text-xl font-medium ' >On: <span className='text-lg text-sky-600'>  12/11/2023 at the day of sunday </span></span>
              <p className='text-lg font-medium'>from: <span className='text-xl font-bold text-sky-600'>Lahore, Pakistan</span></p>


    </div>

    
         </div>

          <Footer />
         
     
         </div>
  )
}