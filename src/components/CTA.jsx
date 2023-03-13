import React from 'react'

const CTA = () => {
  return (
    <div className='px-8 py-16 pb-32'>
        <div className='flex flex-col justify-between items-center space-y-8 md:px-16 py-8 max-w-2xl mx-auto rounded-xl shadow-xl shadow-gray-300'>
            <div className='flex flex-col justify-between items-center w-full space-y-2'>
                <h3 className='text-base font-semibold text-center tracking-wide'>Interested in our services?</h3>
                <h2 className='text-lg font-bold text-center tracking-wide'>let's discuss !</h2>
            </div>
            <p className='text-base font-normal text-center tracking-wide w-full'>We require basic project specifications in a documented form and a clear UI design to start a project. If a client does not have a UI design, we are happy to provide it. This allows us to provide accurate estimates and deliver a solution that meets the client's specific needs and goals</p>
            <div className='flex flex-col justify-evenly items-center w-full xs:flex-row space-y-2 xs:space-y-0'>
                <button className='text-base font-semibold tracking-wide'>Get a quote</button>
                <button className='text-base font-semibold tracking-wide'>Contact Us</button>
            </div>
        </div>
    </div>
  )
}

export default CTA