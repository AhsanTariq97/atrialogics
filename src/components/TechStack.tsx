import React from 'react'
import TechStackCard from './constants/TechStackCard'

interface Props {
    data: {
        title: string;
        stack: {
            name: string;
            icon: string;
            description: string;
        }[];
    }
}

const TechStack = ({ data }: Props) => {

    return (
    <div className='space-y-2'>
        <h3 className='text-xl text-[#7187A2]'>{data.title}</h3>
        <div className='flex flex-col justify-between items-center space-y-4'>
        {data.stack.map((tech: { name: string; icon: string; description: string; }) => (
            <TechStackCard key={tech.name} tech={tech}/>
        ))
        }
        </div>
    </div>
  )
}

export default TechStack