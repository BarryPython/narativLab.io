import { useRef , useEffect} from "react";
import { useTranslation } from "react-i18next";
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

//svg
import {ReactComponent as ArrowGrow} from '../assets/icons/arrowGrow.svg';
import {ReactComponent as Smiley} from '../assets/images/everything/smiley.svg';
import {ReactComponent as Arrow} from '../assets/images/everything/big_arrow.svg';

//style
import "../style/everything.scss"

export default function Everything(){

    const {t} = useTranslation()
    const arrowElement = useRef()
    const SmileyElement = useRef()
    const everythingElement = useRef()

    const [ref, springs] = useInView(
        ()=>({
            from: { y: 100 , opacity : .5 },
            to: { y: 0 , opacity :1},
            delay : 0,
            config : {
                duration : "500"
            },
        }),{once : true}
    )

    useEffect(()=>{

        const handleScroll = (event) => {
                const containerY = everythingElement.current.getBoundingClientRect().y -500 
                if(containerY < 0 && containerY > -300){
                    SmileyElement.current.style.transform = "translateX(" + containerY/6 + "px) translateY(" + -(containerY+200)/4 + "px)"
                    arrowElement.current.style.transform = "translateX(" + -containerY/6 + "px) translateY(" + containerY/4 + "px)"
            }
        }

        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return(
        <animated.section className="everything" ref={ref} style={{...springs}}>
            <span ref={everythingElement}></span>
            <InView className="illustrations"  onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                <Smiley ref={SmileyElement}/>
                <Arrow ref={arrowElement} />
            </InView>
            <InView className="content" onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                <h2>{t("everything_title")}</h2>
                <p>{t("everything_text")}</p>
                <a href="https://mint.narativlab.io/" className="main-btn">{t("everything_cta")}<ArrowGrow /></a>
            </InView>
        </animated.section>
    )
}