import React from 'react'

interface PaginationButtonProps {
  index: number;
  activeIndex: number | null;
  onLoadMore: (index: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ index, activeIndex, onLoadMore }) => {
  return (
    <>
        <button className={`${activeIndex === index ? 'bg-slate-300' : ''} px-4 py-2 rounded-full`} key={index} onClick={() => onLoadMore(index)}>{index + 1}</button>
    </>
  )
}

export default PaginationButton