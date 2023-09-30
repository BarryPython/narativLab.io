import { animated, useInView } from '@react-spring/web';
import { InView } from 'react-intersection-observer';
import { useTranslation } from "react-i18next";

//svg
import {ReactComponent as Arrow} from '../assets/images/explication/arrow.svg';
import {ReactComponent as Calcul} from '../assets/images/explication/calculatrice.svg';
import {ReactComponent as Count} from '../assets/images/explication/count.svg';

//style
import "../style/explication.scss";

export default function Explication (){

    const {t} = useTranslation()

    const [ref, springs] = useInView(
        ()=>({
            from: { y: 100 , opacity : .5 },
            to: { y: 0 , opacity :1},
            config : {
                duration : "1500"
            },
        }),{once : true}
    )

    return (
        <animated.section className='explication' style={{...springs}} ref={ref}>
            <InView className='item' onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                <Arrow />
                <h2>{t("explication_film_title")}</h2>
                <p>{t("explication_film_content")}</p>
            </InView>
            <InView className='item' onChange={(a,entry)=>{if(a)entry.target.classList.add("entered")}}>
                <Count />
                <h2>{t("explication_invest_title")}</h2>
                <p>{t("explication_invest_content")}</p>
            </InView>
            <InView className='item' onChange={(a,entry)=>{if(a)entry.target.classList.add("entered")}}>
                <Calcul />
                <h2>{t("explication_earn_title")}</h2>
                <p>{t("explication_earn_content")}</p>
            </InView>
        </animated.section>
    )
}