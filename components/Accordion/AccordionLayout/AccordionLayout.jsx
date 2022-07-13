

import React from 'react';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

const AccordionLayout = ({ title, children, index, activeIndex, setActiveIndex }) => {
  const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index);

  return (
    <>
        <div onClick={() => handleSetIndex(index)} className='accordion'>
            <h4 className='accordion-title'>{title}</h4>
            <div className="accordion-icon">
                {
                (activeIndex === index) 
                ? <BsFillArrowDownCircleFill className='w-8 h-8' />
                : <BsFillArrowUpCircleFill className='w-8 h-8' />
                }
            </div>
        </div>

        {(activeIndex === index) && (
          <div className="accordion-content shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
            {children}
          </div>
        )}
    </>
  );
};

export default AccordionLayout;