import React from 'react';
import { useTranslation } from 'react-i18next';
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

// style
import "../style/industry.scss"

//svg import
import {ReactComponent as Cpu} from '../assets/icons/cpu.svg';
import {ReactComponent as Diagram} from '../assets/icons/diagram.svg';
import {ReactComponent as People} from '../assets/icons/people.svg';
import {ReactComponent as Redistribute} from '../assets/icons/redistribution.svg';
import {ReactComponent as ArrowGrow} from '../assets/icons/arrowGrow.svg';

export default function Industry(){

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
    

    return(
        <animated.section className='industry' style={{...springs}} ref={ref}>
            <InView className='content' onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}}>
                <h2>
                    {t("industry_title")}
                </h2>
                <p>
                    {t("industry_text")}
                </p>
                <a href='https://narativlab.gitbook.io/narativlab/' className='main-btn'>
                    {t("industry_cta")}
                    <ArrowGrow />
                </a>
            </InView>
            <InView className='list-item' onChange={(a,entry)=>{if(a)entry.target.classList.add("entered")}}>
                <div className='industry_item'>
                    <Cpu/>
                    <p>
                        {t("industry_system")}
                    </p>
                </div>
                <div className='industry_item'>
                    <Diagram/>
                    <p>
                        {t("industry_app")}
                    </p>
                </div>
                <div className='industry_item'>
                    <People/>
                    <p>
                        {t("industry_funding")}
                    </p>
                </div>
                <div className='industry_item'>
                    <Redistribute />
                    <p>
                        {t("industry_redistributed")}
                    </p>
                </div>
            </InView>
        </animated.section>
    )
}