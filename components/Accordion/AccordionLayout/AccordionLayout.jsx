

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

const AccordionLayout = ({ title, children, index, activeIndex, setActiveIndex, expanded }) => {
  const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index);
  const controls = useAnimation();

    const variants = {
      expanded: { opacity: 1, height: "auto" },
      collapsed: { opacity: 0, height: 0 }
    };

    useEffect(() => {
      if (activeIndex === index) {
        controls.start("expanded");
      } else {
        controls.start("collapsed");
      }
    }, [activeIndex, index]);
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
          <motion.div
            className="overflow-hidden accordion-content"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="accordion-content-inner">
            {children}
          </div>
        </motion.div>
        )}
    </>
  );
};

export default AccordionLayout;