import React from 'react'
import ServiceCard from './constants/ServiceCard'

const Services: React.FC = () => {
  return (
    <div id='services' className='flex flex-col justify-between items-center space-y-16 py-8 lg:py-16'>
        <h1 className='text-3xl font-bold tracking-wide'>Our Services</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
            <ServiceCard image='/assets/web.svg' heading='Web Apps' text='Expert Full Stack Application Development using ReactJS, NodeJS, and various databases (MongoDB, Postgres, MySQL, Firebase, GraphQL)' />
            <ServiceCard image='/assets/iosApp.svg' heading='IOS/Android Apps' text='Leading Hybrid Mobile App Development for iOS and Android, including Custom Backend APIs and Admin Panels/Dashboards' />
            <ServiceCard image='/assets/blockChain.svg' heading='Block Chain App' text='Expertise in Developing Web3-based Web Applications using ReactJS and Solidity Contracts (ERC20, ERC721, and Custom Contracts)' />
            <ServiceCard image='/assets/cloud.svg' heading='Cloud Computing' text='Cloud Services for Secure and Scalable Application Deployment (AWS, Azure, Google Cloud, Heroku, VPS)' />
        </div>
    </div>
  )
}

export default Services