import React, { useState } from 'react';
import AccordionLayout from './AccordionLayout/AccordionLayout';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(2);

  return (
      <div className='accordion-layout'>
          <AccordionLayout 
            title="What are the tokens used for?"
            index={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            Adashe is the primary utility token of our ecosystem and will immediately enable you to participate in our staking rewards program as well as our liquidity mining program. All pools will be deployed when the token sale ends. The tokens will also give you governance over the protocol in the future.
          </AccordionLayout>

          <AccordionLayout 
            title="Are any countries excluded from the donation event?"
            index={2}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            All OFAC sanctioned countries are excluded (including USand US residents).  
          </AccordionLayout>
          <AccordionLayout 
            title="Where can I read more about the tokenomics (lock-up, emission schedule, etc.)? "
            index={3}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          >
            You can read everything about our tokenomics in our documentation <a href="https://adashe.gitbook.io/adashe-gitbook/" target="_blank" rel="noopener noreferrer">here</a>.
          </AccordionLayout>
          
      </div>
  );
};

export default Accordion;