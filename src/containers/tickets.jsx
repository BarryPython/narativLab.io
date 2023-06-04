import {useState} from "react";
import { useTranslation } from "react-i18next";
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

//svg
import {ReactComponent as ArrowGrow} from '../assets/icons/arrowGrow.svg';
import {ReactComponent as Card} from '../assets/icons/card.svg';
import {ReactComponent as Star} from '../assets/icons/star.svg';
import {ReactComponent as Badge} from '../assets/icons/badge.svg';

//style
import "../style/tickets.scss"
import '../style/screen.scss'

export default function Tickets({dark}){

    const {t} = useTranslation()
    const [lottery, setLottery] = useState(true);

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

    return (
        <animated.section className="screen" ref={ref} style={{...springs}}>
            <InView className="content" onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                <h2>{t("tickets_title")}</h2>
                <div className="buttons">
                    <button className={!lottery ? "secondary-btn" : "main-btn"} onClick={()=>setLottery(true)}>
                        {t("tickets_cta_1")}
                    </button>
                    <button className={!lottery ? "main-btn" : "secondary-btn"} onClick={()=>setLottery(false)}>
                        {t("tickets_cta_2")}
                    </button>
                </div>
                <div className="content-item">
                    <h3>
                        {lottery ? t("tickets_detail_1_title") : t("tickets_detail_2_title")}
                    </h3>
                    <p>
                        {lottery ? t("tickets_detail_1_text") : t("tickets_detail_2_text")}
                    </p>
                    <a href={!lottery ? "https://narativlab.gitbook.io/narativlab/" : "https://mint.narativlab.io/"}>
                    {lottery ? t("tickets_detail_1_link") : t("tickets_detail_2_link")}
                    <ArrowGrow />
                    </a>
                </div>
            </InView>
            {!lottery ? 
                <InView className="detail lottery" onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                    <h2>{t("ticket_content_2_title")}</h2>
                    <p>{t("ticket_content_2_text")}</p>
                    <div className="detail-item-list">
                        <p className="item white">125 NRT = <strong>5%</strong></p>
                        <p className="item white">500 NRT = <strong>15%</strong></p>
                        <p className="item white">1,500 NRT = <strong>30%</strong></p>
                        <p className="item white">5,000 NRT = <strong>50%</strong></p>
                        <p className="item white">15,0000 NRT = <strong>75%</strong></p>
                        <p className="item white">Pass = <strong>100%</strong></p>
                    </div>
                </InView>
                :
                <InView className="detail pass" onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                    <h2>{t("ticker_pass_benefits")}</h2>
                    <div className="pass-item white">
                        <Card />
                        <p>{t("ticket_content_1_2")}</p>
                    </div>
                    <div className="pass-item white">
                        <Star />
                        <p>{t("ticket_content_1_3")}</p>
                    </div>
                    <div className="pass-item white">
                        <Badge />
                        <p>{t("ticket_content_1_4")}</p>
                    </div>
                </InView>
            }
        </animated.section>
    )
}