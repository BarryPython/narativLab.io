import { useState } from "react";
import { useTranslation } from "react-i18next";
import { animated, useInView } from '@react-spring/web'
import { InView } from 'react-intersection-observer';

//movie info
import movieArray from "../assets/movie.json"

//style
import "../style/movies.scss"

//svg import
import {ReactComponent as Budget} from '../assets/icons/budget.svg';
import {ReactComponent as BoxOffice} from '../assets/icons/box_office.svg';
import {ReactComponent as Profits} from '../assets/icons/profits.svg';
import {ReactComponent as BudgetDark} from '../assets/icons/budget_dark.svg';
import {ReactComponent as BoxOfficeDark} from '../assets/icons/box_office_dark.svg';
import {ReactComponent as ProfitsDark} from '../assets/icons/profits_dark.svg';
import {ReactComponent as Info} from '../assets/icons/info.svg';
import {ReactComponent as Arrow} from '../assets/icons/arrow.svg';

export default function Movie({dark}){

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const {t} = useTranslation()
    const [movieIndex, setMovieIndex] = useState(getRandomInt(movieArray.length-1));

    function nextMovie(){
        if(movieIndex === movieArray.length-1){
            setMovieIndex(0)
        }else{
            setMovieIndex(movieIndex+1)
        }
    }

    function previousMovie(){
        if(movieIndex === 0){
            setMovieIndex(movieArray.length-1)
        }else{
            setMovieIndex(movieIndex-1)
        }
    }

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

    return(
        <animated.section className="movies" ref={ref} style={{...springs}}>
            <img key={movieArray[movieIndex].file} src={"/movie/"+movieArray[movieIndex].file} alt=""/>
            <InView onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}} className="content">
                <h2>{t("movies_title")}</h2>
                <p>{t("movies_text")}</p>
                <InView onChange={(a,entry)=>{if(a)entry.target.style.opacity=1}} className="movie-detail">
                    <h3 key={movieArray[movieIndex].title} >{movieArray[movieIndex].title}</h3>
                    <div className="detail-list">
                        <div className="detail-item">
                            {dark ? <Budget />: <BudgetDark />}
                            <div>
                                <span>
                                    <p>{t("movies_buget")}</p>
                                    <span title={t("movie_buget_info")}>
                                        <Info/>
                                    </span>
                                </span>
                                <h4 key={movieArray[movieIndex].budget} >{movieArray[movieIndex].budget}</h4>
                            </div>
                        </div>
                        <div className="detail-item">
                            {dark ? <BoxOffice />: <BoxOfficeDark />}
                            <div>
                                <span>
                                    <p>{t("movies_box_office")}</p>
                                    <span title={t("movies_box_office_info")}>
                                        <Info/>
                                    </span>
                                </span>
                                <h4 key={movieArray[movieIndex].box} >{movieArray[movieIndex].box}</h4>
                            </div>
                        </div>
                        <div className="detail-item">
                            {dark ? <Profits />: <ProfitsDark />}
                            <div>
                                <span>
                                    <p>{t("movies_profits")}</p>
                                    <span title={t("movies_profits_info")}>
                                        <Info/>
                                    </span>
                                </span>
                                <h4 key={movieArray[movieIndex].profits} >{movieArray[movieIndex].profits}</h4>
                            </div>
                        </div>
                    </div>
                </InView>
                <div className="buttons">
                    <button className="main-btn" onClick={()=>{previousMovie()}}>
                        <Arrow />
                    </button>
                    <button className="main-btn" onClick={()=>{nextMovie()}}>
                        <Arrow />
                    </button>
                </div>
            </InView>
        </animated.section>
    )
}