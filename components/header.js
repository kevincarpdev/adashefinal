import React, { useState, useRef, useEffect } from 'react'
import { m } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import useInView from 'react-cool-inview'
import { useRect } from '@reach/rect'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'
//import { Popover } from '@headlessui/react'

import { isBrowser } from '@lib/helpers'

import {
  useSiteContext,
  useToggleMegaNav,
  useToggleCart,
  useCartCount,
} from '@lib/context'

import PromoBar from '@components/promo-bar'
import Menu from '@components/menu'
import MegaNavigation from '@components/menu-mega-nav'
import Icon from '@components/icon'
//import { useMoralis } from 'react-moralis'

import { useWeb3React } from '@web3-react/core'

import Account from '@components/Account'
//import ETHBalance from '@components/ETHBalance'
import useEagerConnect from '../hooks/useEagerConnect'

const Header = ({ data = {}, isTransparent, onSetup = () => {} }) => {
  // expand our header data
  const {
    promo,
    menuDesktopLeft,
    menuDesktopRight,
    menuMobilePrimary,
    menuMobileSecondary,
  } = data

  // setup states
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(null)
  const { observe, inView: observerIsVisible } = useInView()
  const headerRef = useRef()
  const headerRect = useRect(headerRef)
  const router = useRouter()

  // setup menu toggle event
  const toggleMobileNav = (state) => {
    setMobileNavOpen(state)

    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', state)
    }
  }

  // context helpers
  const { meganav } = useSiteContext()
  const toggleMegaNav = useToggleMegaNav()

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect.height)
    }
  }, [headerRect])

  useEffect(() => {
    onSetup({ height: headerHeight })
  }, [headerHeight])

  // authenticate with Moralis server
  // const {
  //   authenticate,
  //   isAuthenticating,
  //   isAuthenticated,
  //   user,
  //   logout,
  //   web3,
  //   enableWeb3,
  //   isWeb3Enabled,
  //   isWeb3EnableLoading,
  //   web3EnableError,
  // } = useMoralis()

  // Basic Web3 Account Auth
  const { account, library } = useWeb3React()

  const triedToEagerConnect = useEagerConnect()

  const isConnected = typeof account === 'string' && !!library

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <PromoBar data={promo} />

      <header
        className={cx('header', {
          'is-overlay': isTransparent,
          'is-white': isTransparent && !meganav.isOpen && observerIsVisible,
          'has-bg': !observerIsVisible,
        })}
      >
        <div ref={headerRef} className="header--outer">
          <div className="header--inner">
            <div className="header--content">
              <div className="logo">
                {router.pathname === '/' ? (
                  <button
                    className="logo--link"
                    aria-label="Go Home"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Icon name="Logo" id="header" viewBox="0 0 73 20" />
                  </button>
                ) : (
                  <Link href="/" scroll={false}>
                    <a className="logo--link" aria-label="Go Home">
                      <Icon name="Logo" id="header" viewBox="0 0 73 20" />
                    </a>
                  </Link>
                )}
              </div>

              <nav className="main-navigation" role="navigation">

                {/* Mobile Header Menu */}
                <div id="mobile-nav" className="main-navigation--mobile">
                  <FocusTrap active={isMobileNavOpen}>
                    <div>
                      <button
                        onClick={() => toggleMobileNav(!isMobileNavOpen)}
                        className={cx('menu-toggle', {
                          'is-open': isMobileNavOpen,
                        })}
                        aria-expanded={isMobileNavOpen}
                        aria-controls="mobile-nav"
                        aria-label="Toggle Menu"
                      >
                        <span className="hamburger">
                          <span className="hamburger--icon"></span>
                        </span>
                      </button>
                      <m.div
                        initial="hide"
                        animate={isMobileNavOpen ? 'show' : 'hide'}
                        variants={{
                          show: {
                            x: '0%',
                          },
                          hide: {
                            x: '-100%',
                          },
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="menu-mobile"
                      >
                        <div className="menu-mobile--inner">
                          <div className="menu-mobile--primary">
                            {menuMobilePrimary?.items && (
                              <Menu
                                items={menuMobilePrimary.items}
                                onClick={() => toggleMobileNav(false)}
                              />
                            )}
                          </div>

                          <div className="menu-mobile--secondary">
                            {menuMobileSecondary?.items && (
                              <Menu
                                items={menuMobileSecondary.items}
                                onClick={() => toggleMobileNav(false)}
                              />
                            )}
                          </div>
                        </div>
                      </m.div>

                      <div
                        className={cx('menu-mobile--backdrop', {
                          'is-active': isMobileNavOpen,
                        })}
                        onClick={() => toggleMobileNav(false)}
                      />
                    </div>
                  </FocusTrap>

                  <Account triedToEagerConnect={triedToEagerConnect} />

                  <CartToggle />
                </div>

                {/* Desktop Header Menu */}
                <div className="main-navigation--desktop">
                  <div className="menu-left">
                    {menuDesktopLeft?.items && (
                      <Menu
                        items={menuDesktopLeft.items}
                        onClick={() => toggleMegaNav(false)}
                      />
                    )}
                  </div>

                  <div className="menu-right">
                    {menuDesktopRight?.items && (
                      <Menu
                        items={menuDesktopRight.items}
                        onClick={() => toggleMegaNav(false)}
                      />
                    )}
                    {/* <Popover.Group>
                      <Popover>
                        <Popover.Button>Product</Popover.Button>
                        <Popover.Panel>TSSETSE</Popover.Panel>
                      </Popover>

                      <Popover>
                        <Popover.Button>Solutions</Popover.Button>
                        <Popover.Panel>TEST</Popover.Panel>
                      </Popover>
                    </Popover.Group> */}
                    <Account triedToEagerConnect={triedToEagerConnect} />

                    {isConnected && <CartToggle />} 
                    
                    {/* {!isAuthenticated ? (
                      <button
                        disabled={isAuthenticating}
                        onClick={() =>
                          authenticate({
                            signingMessage: 'xAlpha Authentication',
                          })
                        }
                      >
                        Authenticate
                      </button>
                    ) : (
                      <>
                        <span>{user.get('ethAddress')}</span>
                        <button
                          onClick={() => logout()}
                          disabled={isAuthenticating}
                        >
                          Logout
                        </button>
                      </>
                    )} */}
                    
                    

                  </div>
                </div>
              </nav>
            </div>

            <div
              className={cx('header--border', {
                'is-hidden': meganav.isOpen,
              })}
            />
          </div>

          <MegaNavigation
            items={[
              ...(menuDesktopLeft?.items || []),
              ...(menuDesktopRight?.items || []),
            ]}
            headerHeight={
              isTransparent && observerIsVisible ? headerHeight : false
            }
          />
        </div>
      </header>

      <span ref={observe} className="header--observer" />
    </>
  )
}

const CartToggle = () => {
  const toggleCart = useToggleCart()
  const cartCount = useCartCount()

  return (
    <button
      className="cart-toggle"
      onClick={() => toggleCart()}
      aria-label="Toggle Cart"
    >
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="3.86841"
          width="14"
          height="11.6316"
          rx="1.5"
          stroke="white"
        />
        <path
          d="M11.0527 4.15789C11.0527 2.41384 9.46208 1 7.50002 1C5.53795 1 3.94739 2.41384 3.94739 4.15789"
          stroke="white"
        />
      </svg>

      {/* <span
        className={cx('cart-toggle--count', {
          'is-active': cartCount > 0,
        })}
      >
        {cartCount}
      </span> */}
    </button>
  )
}

const HeaderBackdrop = ({ isActive, onClick }) => {
  return (
    <div
      className={cx('header--backdrop', {
        'is-active': isActive,
      })}
      onClick={onClick}
    />
  )
}

export default Header
