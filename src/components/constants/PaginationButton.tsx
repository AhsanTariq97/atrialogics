import React from 'react'

interface PaginationButtonProps {
  index: number;
  activeIndex: number | null;
  onLoadMore: (index: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ index, activeIndex, onLoadMore }) => {
  return (
    <>
        <button className={`${activeIndex === index ? 'bg-[#3e536e] text-white' : 'border border-gray-300'} w-[45px] h-[45px] rounded-full shadow-xl`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
    </>
  )
}

export default PaginationButton