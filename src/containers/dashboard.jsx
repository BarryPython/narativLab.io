import {useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

//images
import overview from "../assets/images/dashboard/overview.png"
import voting from "../assets/images/dashboard/voting.png"
import investment from "../assets/images/dashboard/investment.png"
import lottery from "../assets/images/dashboard/lottery.png"

//style
import "../style/dashboard.scss"

export default function Dashboard(){

    const {t} = useTranslation()
    const [state, setState] = useState(null);
    const firstItem = useRef()

    function emulateClick(){
        setTimeout(()=>{firstItem.current.click()},1000)
    }

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

    function returnAdaptedImg(state){
        switch (state) {
            case 0:
                return (<div className="preview" style={{backgroundColor : "#7EE48C"}}>
                            <img key={"a"} src={overview} alt="overview"/>
                        </div>)
            case 1:
                return (<div className="preview" style={{backgroundColor : "#E47E7E"}}>
                            <img key={"b"} src={voting} alt="voting"/>
                        </div>)
            case 2:
                return (<div className="preview" style={{backgroundColor : "#7ECCE4"}}>
                            <img key={"c"} src={lottery} alt="lottery"/>
                        </div>)
            case 3:
                return (<div className="preview" style={{backgroundColor : "#997EE4"}}>
                            <img key={"d"} src={investment} alt="investment"/>
                        </div>)
            default:
                return (<div className="preview" style={{backgroundColor : "#7EE48C"}}>
                            <img key={"a"} src={overview} alt="overview"/>
                        </div>)
        }
    }

    return(
        <animated.section className="dashboard" ref={ref} style={{...springs}}>
            <InView as="h2" onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>{t("dashboard_title")}</InView>
            <InView className="content" onChange={(a,entry)=>{if(a){entry.target.style.opacity=1;emulateClick()}}}>
                <div className="item-list">
                    <div className={state === 0 ? "active item" : "item"} onClick={()=>setState(0)} ref={firstItem}>
                        <h4>{t("dashboard_overview_title")}</h4>
                        <p>{t("dashboard_overview_text")}</p>
                    </div>
                    <div className={state === 1 ? "active item" : "item"} onClick={()=>setState(1)}>
                        <h4>{t("dashboard_films_title")}</h4>
                        <p>{t("dashboard_films_text")}</p>
                    </div>
                    <div className={state === 2 ? "active item" : "item"} onClick={()=>setState(2)}>
                        <h4>{t("dashboard_lottery_title")}</h4>
                        <p>{t("dashboard_lottery_text")}</p>
                    </div>
                    <div className={state === 3 ? "active item" : "item"} onClick={()=>setState(3)}>
                        <h4>{t("dashboard_investment_title")}</h4>
                        <p>{t("dashboard_investment_text")}</p>
                    </div>
                </div>
                {returnAdaptedImg(state)}
            </InView>
        </animated.section>
    )
}