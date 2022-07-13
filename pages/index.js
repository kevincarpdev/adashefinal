import React, { useState, useEffect } from 'react';
import cn from 'classnames'
import Head from "next/head";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { Card, Modal } from "antd";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import mainLogo from '../public/logo.png'
import menuLogo from '../public/menuLogo.png'
import Image from 'next/image'
import PageBreak from "../public/PageBreak.svg";
import * as Scroll from 'react-scroll';
import PageBreakBottom from "../public/PageBreakBottom.svg";
import { motion } from "framer-motion";
import Sticky from 'react-stickynode';
import NativeBalance from "../components/NativeBalance";
import Account from "../components/Account/Account";
import DEX from "../components/DEX";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { MdSpaceDashboard, MdClose, MdGeneratingTokens, MdOutlineArrowDownward } from 'react-icons/md';
import { FaDiscord, FaTelegramPlane, FaMediumM, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { useSpring, animated } from "react-spring";
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import Uniswap from '../public/uniswap.png'
import DYDX from '../public/dydx.png'
import CoinBase from '../public/coinbase.png'
import Metamask from '../public/metamask.png'
import Metamask2 from '../public/metamask2.png'
import PalRemit from '../public/palremit.png'
import Pancake from '../public/pancake.png'
import TrustWallet from '../public/trustwallet.png'
import WalletConnect from '../public/walletconnect.png'
import Accordion from '../components/Accordion/Accordion';
import Wallet from "../components/Wallet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, A11y } from "swiper";

// import Ramper from "../components/Ramper";

const Home = ({ data }) => {
  const [stickyNav, setStickyNav] = useState(false)
  const ref = React.createRef()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const [openBar, setOpenBar] = useState();
  const { authenticate, isAuthenticated, Moralis } = useMoralis();
  let ScrollLink = Scroll.Link;

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate()
        .then(function (user) {
          console.log(Moralis.User.current().get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const data01 = [
    { name: 'Presale', value: 20.09 },
    { name: 'Marketing', value: 2.5 },
    { name: 'Team Allocation', value: 7 },
    { name: 'Strategic Partners', value: 2.5 },
    { name: 'Reserves', value: 23.72 },
    { name: 'DeFi Staking Rewards', value: 30 },
    { name: 'Partner Recruitment', value: 2.5 },
    { name: 'Initial Token Sales', value: 21.78 },
  ];

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      document.body.classList.add('sticky-nav');
    }
    else {
      document.body.classList.remove('sticky-nav');
    }
    return;
  };

  const { left } = useSpring({
    from: { left: "-105%" },
    left: openBar ? "0" : "-105%"
  });
  const notify = () =>
    toast.warn('ADSE is only available on via MATIC. Please switch to the Polygon network in order to purchase ADSE.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => setStickyNav(e.intersectionRatio < 1),
      { threshold: [1] }
    )
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [ref])

  // const { fetch, error, isFetching } = useWeb3Transfer({
  //   amount: Moralis.Units.Token(20, 18),
  //   receiver: "0x0000000000000000000000000000000000000000",
  //   type: "erc20",
  //   contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  // });

  // const swiper = new Swiper('.swiper', {
  //   // configure Swiper to use modules
  //   modules: [Navigation, Pagination],

  // });

  return (
    <div>
      <Head>
        <title>Adashe</title>
        <meta name="description" content="Adashe is cheaper, faster and more efficient than traditional DeFi platforms, making it more accessible to everyone. Learn more here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#060B19",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#382C53",
            },
            links: {
              color: "#382C53",
              distance: 250,
              enable: true,
              opacity: 1.0,
              width: 2,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1920,
              },
              value: 100,
            },
            opacity: {
              value: 1.0,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      <header id="hero" className="hero">

        <Sticky onStateChange={handleStateChange}>
          <div className={cn(!stickyNav ? 'stuck' : '', 'tertiary-nav')}>
            <div className="container">
              <ul>
                <li><a onClick={() => setIsBuyModalVisible(true)}>Buy</a></li>
                <li><a onClick={() => setOpenSideBar(true)}>Exchange</a></li>
              </ul>
            </div>
          </div>
        </Sticky>

        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>Buy Adashe (ADSE)</h1>
              <div>
                <span className='subheader'>Adashe is the primary utility token of our ecosystem and will immediately enable you to participate in our staking rewards program as well as our liquidity mining program. All pools will be deployed when the token sale ends.</span>
                <p><span className="price"><span className="highlight">1 ADSE = $0.00087 USD</span></span></p>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1.0 }}
                  className="btn"
                  onClick={login}
                >
                  {isAuthenticated ? <ScrollLink to='mint' spy={true} offset={-50}>Mint <MdOutlineArrowDownward /></ScrollLink> : <Account />}
                </motion.button>
                {/* <button onClick={notify}>Notify!</button> */}

              </div>
            </div>
            <div className="logo">
              <Image
                src={mainLogo}
                alt="Logo"
                quality="85"
                layout="intrinsic"
              />
            </div>
          </div>
        </div>
      </header>

      {/* <button className="menuButton" onClick={() => setOpenBar(openBar => !openBar)}>
        {!openBar ? <MdSpaceDashboard /> : <MdClose />}
      </button> */}

      <main className="flex flex-col text-center">

        <section id="info" ref={ref}>
          <div className="container">
            <div className="card-row">
              <motion.div
                className="card"
                whileHover={{ scale: 1.1 }}
              >
                <h3>Supply</h3>
                <p>A total of a 750,000,000 ADSE (7.5% of the supply) is available for the presale event. The total ADSE supply is 10,000,000,000.</p>
              </motion.div>
              <motion.div
                className="card"
                whileHover={{ scale: 1.1 }}
              >
                <h3>Terms</h3>
                <p>The contract accepts WETH or USDC and the starting token price will be $0.00087 per ADSE.</p>
              </motion.div>
              <motion.div
                className="card"
                whileHover={{ scale: 1.1 }}
              >
                <h3>Distribution</h3>
                <p>There is no front-running and being first or last doesn&apos;t matter. All participants will receive ADSE at the same rate depending on how much is purchased.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="mint">
          <span className='subheader highlight'><h3>Buy Adashe</h3></span>
          {isAuthenticated ?
            <>
              <Wallet />
            </>

            :
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.0 }}
              className="btn"
              onClick={login}
            >
              {!isAuthenticated ? <Account /> : <></>}
            </motion.button>
          }
        </section>

        <section id="allocation">
          <div className="container">
            <span className='subheader'><h3>Token Allocation</h3></span>
            <div className="pieContainer hidden md:block">
              <PieChart width={500} height={500} className="pieChart">
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data01}
                  fill="#313233"
                  label
                />
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
            <div className="pieContainer block md:hidden">
              <PieChart width={300} height={300} className="pieChart">
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data01}
                  fill="#313233"
                  label
                />
                <Legend />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </section>

        <section id="logos">
          <span className='subheader'><h3>Exchanges &amp; Wallets</h3></span>
          <div className="container-lg">
            <Swiper
              spaceBetween={50}
              freeMode={true}
              modules={[FreeMode, A11y]}
              className="marquee"
              breakpoints={{
                0: {
                  width: 0,
                  slidesPerView: 3,
                },
                768: {
                  width: 768,
                  slidesPerView: 5,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 8,
                },
              }}

            >
              <SwiperSlide>
                <Image
                  src={DYDX}
                  alt="DYDX"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={Metamask2}
                  alt="MetaMask"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={CoinBase}
                  alt="CoinBase"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={Uniswap}
                  alt="Uniswap"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={PalRemit}
                  alt="PalRemit"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={Pancake}
                  alt="Pancake"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={TrustWallet}
                  alt="TrustWallet"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={WalletConnect}
                  alt="WalletConnect"
                  quality="85"
                  layout="intrinsic"
                />
              </SwiperSlide>
            </Swiper>
          </div>

        </section>

        <section id="faq">
          <span className='subheader'><h3>FAQ</h3></span>
          <div className="container">
            <div className="accordion-list">
              <Accordion />
            </div>
          </div>
        </section>

        <section className="tab-container">
          <div className="menuLogo">
            <ScrollLink to='hero'>
              <Image
                src={menuLogo}
                alt="Logo"
                quality="85"
                layout="intrinsic"
              />
            </ScrollLink>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div id="bottomGraphic">
          <PageBreakBottom />
        </div>
        <div className="footerLogo">
          <ScrollLink to='hero' activeClass='selected' spy={true}>
            <Image
              src={mainLogo}
              alt="Logo"
              quality="85"
              layout="intrinsic"
            />
          </ScrollLink>
        </div>
        <ul>
          <motion.li
            whileHover={{ scale: 1.1 }}
          >
            <a target="_blank" href='https://discord.com/invite/GsHbMe5UGv' rel="noopener noreferrer">
              <FaDiscord />
            </a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
          >
            <a target="_blank" href='https://t.me/adashecrypto' rel="noopener noreferrer"><FaTelegramPlane /></a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
          >
            <a target="_blank" href='https://medium.com/@adashecrypto' rel="noopener noreferrer"><FaMediumM /></a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
          >
            <a target="_blank" href='https://www.instagram.com/adashecrypto/' rel="noopener noreferrer"><FaInstagram /></a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
          >
            <a target="_blank" href='https://www.facebook.com/adashecrypto' rel="noopener noreferrer"><FaFacebookF /></a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
          >
            <a target="_blank" href='https://twitter.com/adashecrypto' rel="noopener noreferrer"><FaTwitter /></a>
          </motion.li>
        </ul>
      </footer>
      <div id="notification">
        <ToastContainer />
      </div>

      <animated.div style={{ left: left }} className="sidebar">
        <button className="menuButton" onClick={() => setOpenBar(openBar => !openBar)}>
          {!openBar ? <MdSpaceDashboard /> : <MdClose />}
        </button>

        <div className="sidebar-menu">
          <div className="tile">
            <ScrollLink to='supply' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              Supply
            </ScrollLink>
          </div>
          <div className="tile">
            <ScrollLink to='terms' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              Terms
            </ScrollLink>
          </div>
          <div className="tile">
            <ScrollLink to='distribution' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              <span>Fair</span> Distribution
              <p>No front-running</p>
            </ScrollLink>
          </div>
          <div className="tile">
            <ScrollLink to='allocation' activeClass='selected' spy={true}>
              <MdGeneratingTokens />
              <span>Token</span> Allocaton
            </ScrollLink>
          </div>
        </div>
      </animated.div>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="500px"
      >
        Exchange
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <DEX chain="eth" />
        </Card>
      </Modal>
      <Modal
        visible={isBuyModalVisible}
        footer={null}
        onCancel={() => setIsBuyModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="500px"
      >
        Buy
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
            minHeight: "300px",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          {/* <Ramper /> */}
          <p className="coming-soon">Coming Soon</p>
        </Card>
      </Modal>
    </div >
  )
}


export async function getStaticProps() {

  return {
    props: {
      data: 'Home',
    },
  }
}

export default Home
