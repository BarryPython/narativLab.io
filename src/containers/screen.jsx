import { useTranslation } from "react-i18next";
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

//style
import '../style/screen.scss'

export default function Screen(){

    const {t} = useTranslation()

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

    return(
        <animated.section className="screen" ref={ref} style={{...springs}}>
            <InView className="content" onChange={(a,entry)=>{if(a)entry.target.classList.add('appear')}}>
                <h2>
                    {t("screen_title")}
                </h2>
                <p>
                    {t("screen_text")}
                </p>
                <a className="main-btn" href="https://0crd6sjg79j.typeform.com/to/q5WDtdoW" target="_blank" rel="noreferrer">
                    {t("screen_cta")}
                </a>
            </InView>
            <InView className="illustration" onChange={(a,entry)=>{if(a)entry.target.classList.add('appear')}}>
                <h3>
                    {t("screen_catch_sentence")}
                </h3>
            </InView>
        </animated.section>
    )
}