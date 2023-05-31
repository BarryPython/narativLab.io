import React, { useRef, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "i18next"

// style
import "../style/nav.scss"

//svg import
import {ReactComponent as LogoText} from '../assets/icons/logo_text.svg';
import {ReactComponent as Moon} from '../assets/icons/moon.svg';
import {ReactComponent as Sun} from '../assets/icons/sun.svg';
import {ReactComponent as LogoShort} from '../assets/icons/logo_short.svg';
import {ReactComponent as LogoShortDark} from '../assets/icons/logo_short _dark.svg';
import {ReactComponent as Hamburger} from '../assets/icons/hamburger.svg';
import {ReactComponent as Close} from '../assets/icons/close.svg';

export default function Navbar({setDark, dark}){

    const {t} = useTranslation()
    const navRef = useRef()
    const navElement = useRef()
    const navMobileElement = useRef()
    const [mobile_menu, setMobile_menu] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(()=>{
        console.log(dark)
    })

    function switch_dark(dark){
        const elements = document.querySelectorAll('*');
        if(dark){
            elements.forEach((element) => {
                element.classList.add('dark');
            });
        }else{
            elements.forEach((element) => {
                element.classList.remove('dark');
            });
        }
    }
    
    useEffect(()=>{

        const handleScroll = (event) => {
                const containerY = navRef.current.getBoundingClientRect().y
                if(containerY < -50){
                    setScrolled(true)
                    navElement.current.classList.add("scrolled")
                    navMobileElement.current.classList.add("scrolled")
                }else{
                    setScrolled(false)
                    navElement.current.classList.remove("scrolled")
                    navMobileElement.current.classList.remove("scrolled")
                }
        }

        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    })

    //{scrolled ? <LogoShort onClick={()=>{window.location.href = "/#top"}} className="short" style={{...{fill : !dark ? "white" : ""}}}/> : <Logo onClick={()=>{window.location.href = "/#top"}} style={{fill : !dark ? "white" : ""}}/>}

    return(
        <div ref={navRef}>
            <span id='blur_layer' style={{opacity : mobile_menu ? 1:0}}></span>
            <nav ref={navElement}>
                <span className='logo' onClick={()=>{window.location.href = '/#landing'}}>
                    <LogoShort className={scrolled ? "short" : ""} style={{...{fill : !dark ? "white" : ""}}}/>
                    <LogoText style={{...{opacity : scrolled ? "0" : "1"}}}/>
                </span>
                <div>
                    <a href='/#industry'>{t("nav_about")}</a>
                    <a href='/#figures'>{t("nav_market")}</a>
                    <a href='/#movie'>{t("nav_solution")}</a>
                    <a href='/#everything'>{t("nav_invest")}</a>
                    <a href='/#screen'>{t("nav_screen")}</a>
                    <a href='/#dashboard'>{t("nav_dashboard")}</a>
                </div>
                <div>
                    <button onClick={()=>{setDark(!dark);switch_dark(dark)}}>
                        {!dark ? <Sun /> : <Moon />}
                    </button>
                    <select className='secondary-btn' defaultValue={i18n.language} onChange={(e)=>{i18n.changeLanguage(e.target.value)}}>
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                    </select>
                    <a href='https://app.narativlab.io/' className='main-btn'>{t("nav_main_btn")}</a>
                </div>
            </nav>
            <div className='mobile-nav mobile-only' ref={navMobileElement}>
                {!dark ? <LogoShortDark /> : <LogoShort style={{"fill" : "black"}}/>}
                <button onClick={()=>setMobile_menu(true)}>
                    <Hamburger style={{fill : !dark ? "white" : "black"}}/>
                </button>
            </div>
            <div className='mobile-menu mobile-only' style={{transform : (mobile_menu? "" : "translateX(100vw)")}}>
                <button className='close' onClick={()=>setMobile_menu(false)}></button>
                <div className='menu'>
                    <div>
                        {!dark ? <LogoShortDark /> : <LogoShort style={{"fill" : "black"}}/>}
                        <button onClick={()=>setMobile_menu(false)}>
                            <Close style={{fill : !dark ? "white" : "black"}} />
                        </button>
                    </div>
                    <div>
                        <a onClick={()=>setMobile_menu(false)} href='/#industry'>{t("nav_about")}</a>
                        <a onClick={()=>setMobile_menu(false)} href='/#figures'>{t("nav_market")}</a>
                        <a onClick={()=>setMobile_menu(false)} href='/#movie'>{t("nav_solution")}</a>
                        <a onClick={()=>setMobile_menu(false)} href='/#everything'>{t("nav_invest")}</a>
                        <a onClick={()=>setMobile_menu(false)} href='/#screen'>{t("nav_screen")}</a>
                        <a onClick={()=>setMobile_menu(false)} href='/#dashboard'>{t("nav_dashboard")}</a>
                        <a href='https://mint.narativlab.io/' className='main-btn'>Get my Narativ Pass</a>
                    </div>
                    <div>
                        <select className='secondary-btn' onChange={(e)=>{i18n.changeLanguage(e.target.value)}} defaultValue={i18n.language}>
                            <option value="en">EN</option>
                            <option value="fr">FR</option>
                        </select>
                        <button onClick={()=>{setDark(!dark);switch_dark(dark)}}>
                            {!dark ? <Sun /> : <Moon />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}