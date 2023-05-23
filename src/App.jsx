import React, { Suspense, useState, useEffect } from 'react';
import DotMenu from './containers/dotMenu';
import Everything from './containers/everything';
import Figures from './containers/figures';
import Industry from './containers/industry';
import Landing from './containers/landing';
import Movie from './containers/movie';
import Navbar from './containers/navBar';
import Tickets from './containers/tickets';
import Screen from './containers/screen';
import './i18n'
import Dashboard from './containers/dashboard';
import Footer from './containers/footer';

import { InView } from 'react-intersection-observer';

function App() {

  const [dot, setDot] = useState("landing")
  const [dark, setDark] = useState(true)

  function switch_dark(dark){
    if(dark === "false"){
        setTimeout(()=>{
          const elements = document.querySelectorAll('*');
          elements.forEach((element) => {
            element.classList.add('dark');
        });
        },100)
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem('dark')
    if(stored !== null){
      console.log(stored, "stored")
      if(stored === "false"){
        setDark(false)
      }else{
        setDark(true)
      }
      switch_dark(stored);
    }
  }, []);

  useEffect(() => {
    setTimeout(()=>{
      if(dark !== null){
        console.log(dark, "before assignment")
        window.localStorage.setItem('dark', dark);
      }
    },600);
  }, [dark]);

  return (
    <div>
      <Suspense fallback={null}>
        <DotMenu dot={dot}/>
        <Navbar id="top" setDark={setDark} dark={dark}/>
        <InView id="landing" onChange={(inView)=>{if(inView){setDot("landing")}}}  rootMargin={"-200px"} className="center">
          <Landing setDot={setDot} dark={dark} />
        </InView>
        <InView id="industry" onChange={(inView)=>{if(inView){setDot("industry")}}} rootMargin={"-200px"} className="center">
          <Industry />
        </InView>
        <InView id="figures" onChange={(inView)=>{if(inView){setDot("figures")}}} rootMargin={"-200px"} className="center">
          <Figures dark={dark} />
        </InView>
        <InView id="movie" onChange={(inView)=>{if(inView){setDot("movie")}}} rootMargin={"-200px"} className="center">
          <Movie dark={dark} />
        </InView>
        <InView id="everything" onChange={(inView)=>{if(inView){setDot("everything")}}} rootMargin={"-200px"} className="center">
          <Everything />
        </InView>
        <InView id="tickets" onChange={(inView)=>{if(inView){setDot("tickets")}}} rootMargin={"-200px"} className="center">
          <Tickets dark={dark}/>
        </InView>
        <InView id="screen" onChange={(inView)=>{if(inView){setDot("screen")}}} rootMargin={"-200px"} className="center">
          <Screen />
        </InView>
        <InView id="dashboard" onChange={(inView)=>{if(inView){setDot("dashboard")}}} rootMargin={"-200px"} className="center">
          <Dashboard />
        </InView>
        <Footer/>
      </Suspense>
    </div>
  );
}

export default App;
