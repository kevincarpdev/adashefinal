import React, { useState } from 'react';
import { useSpring, animated } from "react-spring";
import * as Scroll from 'react-scroll';
import { MdSpaceDashboard } from 'react-icons/md';

const Sidebar = ({show}) => {

  
  let ScrollLink = Scroll.Link;
  const [openSideBar, setOpenSideBar] = useState();
  const { left } = useSpring({
    from: { left: "-100%" },
    left: show ? "0" : "-100%"
  });
  return (
    <animated.div style={{ left: left }} className="sidebar">
      <button className="menuButton" onClick={() => setOpenSideBar(setOpenSideBar => !setOpenSideBar)}>
        <MdSpaceDashboard />
      </button>
      <div className="sidebar-menu">
        <div className="tile">
          <ScrollLink to='supply' activeClass='selected' spy={true}>Supply</ScrollLink>
        </div>
        <div className="tile">
          <ScrollLink to='terms' activeClass='selected' spy={true}>Terms</ScrollLink>
        </div>
        <div className="tile">
          <ScrollLink to='distribution' activeClass='selected' spy={true}><span>Fair</span> Distribution</ScrollLink>
        </div>
        <div className="tile">
          <ScrollLink to='allocation' activeClass='selected' spy={true}><span>Token</span> Allocaton</ScrollLink>
        </div>
      </div>
    </animated.div>
  );
};

export default Sidebar;

