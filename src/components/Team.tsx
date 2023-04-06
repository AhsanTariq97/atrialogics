import React from 'react'
import Link from 'next/link'
import Button from './constants/Button'
import TeamCard from './constants/TeamCard'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

const Team: React.FC = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div id='team' className='before:block before:h-[100px] before:-mt-[100px]'>
      <div className='flex flex-col justify-between items-center space-y-4 px-8 py-4'>
          <h1 data-aos='fade-up' className='text-3xl font-bold text-center tracking-wide'>Meet our team</h1>
          <p data-aos='fade-up' className='text-sm font-normal text-[#6E7477] text-center max-w-2xl tracking-wide'>Our organization boasts a team of highly skilled developers, designers, and team leads who strive to maintain the highest standards of excellence in our systems.</p>
          <div className='flex flex-col justify-between items-center space-y-8 py-8 md:flex-row md:space-y-0 md:space-x-24 lg:space-x-48'>
              <TeamCard image='/assets/team/avatar-2.jpg' name='Faisal Hafeez' post='Co-Founder, CEO' linkedin='https://www.linkedin.com/in/faisalhafeez/' twitter='https://twitter.com/thefaisalhafeez' skype='skype:faisal.hafeez77?chat' />
              <TeamCard image='/assets/team/avatar-1.png' name='Basit Maqsood' post='Co-Founder, CTO' linkedin='https://www.linkedin.com/in/basitmaqsood/' twitter='https://twitter.com/MBasitMaqsood1' skype='skype:malikbasitmaqsood_1?chat' />
              <TeamCard image='/assets/team/avatar-3.jpg' name='Muhammad Ali' post='Growth Hacker' linkedin='https://www.linkedin.com/in/basitmaqsood/' twitter='https://twitter.com/MBasitMaqsood1' skype='skype:malikbasitmaqsood_1?chat' />
          </div>
          <Link data-aos='fade-up' className='pt-8' href='#contact' ><Button type='text' text='Contact Us' /></Link>
      </div>
    </div>
  )
}

export default Team