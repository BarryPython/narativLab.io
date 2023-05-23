import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

//images
import image from "../assets/images/figures/figures.png"
import gif from "../assets/images/figures/figures.gif"
import image_dark from "../assets/images/figures/figures_dark.png"
import gif_dark from "../assets/images/figures/figures_dark.gif"

//svg imports
import {ReactComponent as LogoShort} from '../assets/icons/logo_short.svg';

//style
import "../style/figures.scss"

export default function Figures({dark}){

    const {t} = useTranslation()
    const [cardInView, setCardInView] = useState(false)

    const container = useRef();
    const card2018 = useRef();
    const card2019 = useRef();
    const card2020 = useRef();
    const card2021 = useRef();
    const card2022 = useRef();

    const [ref, springs] = useInView(
        ()=>({
            from: { y: 100 , opacity : .5 },
            to: { y: 0 , opacity :1},
            delay : 0,
            config : {
                duration : "1500"
            },
        }),{once : true}
    )

    useEffect(() => {
            setTimeout(()=>{setCardInView(false)},4000)
    }, [cardInView])

    useEffect(()=>{

        const handleScroll = (event) => {
                const containerY = container.current.getBoundingClientRect().y

                //console.log(card19Y)
                if(containerY< 0 && -containerY < 300){
                    card2019.current.style.marginTop = -containerY + "px"
                }

                if(containerY< 0 && -containerY < 600){
                    card2020.current.style.marginTop = -containerY + "px"
                }

                if(containerY< 0 && -containerY < 900){
                    card2021.current.style.marginTop = -containerY + "px"
                }

                if(containerY< 0 && -containerY < 1200){
                    card2022.current.style.marginTop = -containerY + "px"
                }
        }

        window.addEventListener("scroll",handleScroll);

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return(
        <animated.section className="figures"
            ref={ref}
            style={{...springs}}>
            <img src={cardInView ? (dark ? gif : gif_dark) : (dark ? image : image_dark)} alt="figures" className="desktop-only"/>
            <InView className="content" onChange={(c,b)=>{if(c){b.target.style.opacity=1};setCardInView(c)}}>
                <LogoShort />
                <h3>
                    {t("figures_title")}
                </h3>
                <p ref={container}>
                    {t("figures_text")}
                </p>
            </InView>
            <InView className="mobile-only number-list" onChange={(inview)=>setCardInView(inview)} rootMargin="-100px" >
                <div className="item" style={{zIndex : "5"}} ref={card2018}>
                    <span>2018</span>
                    <div>
                        <div>
                            <h4>320</h4>
                            <p>{t("figures_number_movie")}</p>
                        </div>
                        <div>
                            <h4>+574%</h4>
                            <p>{t("figures_number_profits")}</p>
                        </div>
                    </div>
                </div>
                <div className="item" style={{zIndex:"4"}} ref={card2019}>
                    <span>2019</span>
                    <div>
                        <div>
                            <h4>311</h4>
                            <p>{t("figures_number_movie")}</p>
                        </div>
                        <div>
                            <h4>+488%</h4>
                            <p>{t("figures_number_profits")}</p>
                        </div>
                    </div>
                </div>
                <div className="item" style={{zIndex:"3"}} ref={card2020}>
                    <span>2020</span>
                    <div>
                        <div>
                            <h4>117</h4>
                            <p>{t("figures_number_movie")}</p>
                        </div>
                        <div>
                            <h4>+310%</h4>
                            <p>{t("figures_number_profits")}</p>
                        </div>
                    </div>
                </div>
                <div className="item" style={{zIndex:"2"}} ref={card2021}>
                    <span>2021</span>
                    <div>
                        <div>
                            <h4>174</h4>
                            <p>{t("figures_number_movie")}</p>
                        </div>
                        <div>
                            <h4>+257%</h4>
                            <p>{t("figures_number_profits")}</p>
                        </div>
                    </div>
                </div>
                <div className="item" style={{zIndex:"1"}} ref={card2022}>
                    <span>2022</span>
                    <div>
                        <div>
                            <h4>153</h4>
                            <p>{t("figures_number_movie")}</p>
                        </div>
                        <div>
                            <h4>+418%</h4>
                            <p>{t("figures_number_profits")}</p>
                        </div>
                    </div>
                </div>
            </InView>
        </animated.section>
    )
}