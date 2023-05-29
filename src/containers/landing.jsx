import React, {useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';

//style
import "../style/landing.scss"

//svg import
import {ReactComponent as ArrowDown} from '../assets/icons/arrowDown.svg';
import {ReactComponent as ArrowDownDark} from '../assets/icons/arrowDown_dark.svg';
import {ReactComponent as ArrowGrow} from '../assets/icons/arrowGrow.svg';
import {ReactComponent as ArrowGrowDark} from '../assets/icons/arrowGrow_dark.svg';

function Landing({setDot, dark}){

    const {t} = useTranslation()
    const scrollmsg = useRef()

    useEffect(()=>{

        const handleScroll = (event) => {
                const containerY = scrollmsg.current.getBoundingClientRect().y
                if(containerY < 400){
                    scrollmsg.current.style.opacity = 0
                }else{
                    scrollmsg.current.style.opacity = 1
                }
        }

        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return(
        <section className='landing'>
            <div className='container'>
                <div className='content'>
                    <h1>
                        {t("landing_title")}
                    </h1>
                    <h3>
                        {t("landing_subtitle")}
                    </h3>
                    <div className='btn-group'>
                        <a href='https://invest.narativlab.io/' className='main-btn'>
                            {t("landing_btn_first")}
                        </a>
                        <a href='https://narativlab.gitbook.io/narativlab/' target="_blank" rel="noreferrer" className='secondary-btn'>
                            {t("landing_btn_second")}
                            {!dark ? <ArrowGrowDark /> :<ArrowGrow />}
                        </a>
                    </div>
                </div>
                <div className='scroll-message desktop-only' ref={scrollmsg}>
                    <p>{t("landing_scroll_txt")}</p>
                    {dark ? <ArrowDown />: <ArrowDownDark />}
                </div>
            </div>
        </section>
    )
}

export default Landing