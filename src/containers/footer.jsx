import React, {useRef, useState} from "react";
import { useTranslation } from "react-i18next";

//style
import "../style/footer.scss"

//svg
import {ReactComponent as Logo} from '../assets/icons/logo.svg';
import {ReactComponent as TWITTER} from '../assets/icons/TWITTER.svg';
import {ReactComponent as INSTA} from '../assets/icons/INSTA.svg';
import {ReactComponent as MEDIUM} from '../assets/icons/MEDIUM.svg';
import {ReactComponent as GITBOOK} from '../assets/icons/GITBOOK.svg';
import {ReactComponent as DISCORD} from '../assets/icons/DISCORD.svg';

//pdf
import paper from '../assets/whitepaper.pdf';

export default function Footer(){

    const {t} = useTranslation()
    const submitButton = useRef(null)
    const emailInput = useRef(null)
    const [email, setEmail] = useState('')

    return(
        <footer>
            <div>
                <div>
                    <Logo style={{"cursor" : "pointer"}} onClick={()=>{window.location.href = "/#top"}} />
                </div>
                <div className="pages">
                    <h4>{t("footer_explore")}</h4>
                    <a href='/#figures'>{t("nav_market")}</a>
                    <a href='/#movie'>{t("nav_solution")}</a>
                    <a href='/#everything'>{t("nav_invest")}</a>
                    <a href='/#screen'>{t("nav_screen")}</a>
                    <a href='/#dashboard'>{t("nav_dashboard")}</a>
                </div>
                <div className="pages">
                    <h4>{t("footer_about")}</h4>
                    <a target="_blank" rel="noreferrer" href="mailto:contact@narativlab.io">Contact</a>
                    <a href={paper} target="_blank" rel="noreferrer">{t("footer_white")}</a>
                    <a target="_blank" rel="noreferrer" href="https://linktr.ee/narativlab">{t("footer_official")}</a>
                    <a target="_blank" rel="noreferrer" href="https://narativlab.gitbook.io/narativlab/technical/security">{t("footer_audit")}</a>
                    <a target="_blank" rel="noreferrer" href="https://medium.com/@narativlab">{t("footer_blog")}</a>
                </div>
                <form classnName="email-subscribe" onSubmit={(e)=>{e.preventDefault();
                fetch(`https://narativlabewt4jgsw-subscribe-newsletter.functions.fnc.fr-par.scw.cloud/?email=${email}`);
                emailInput.current.classList.add("submited")
                submitButton.current.classList.add("submited")
                setTimeout(()=>{submitButton.current.textContent = t("footer_submited")},300)
                }}>
                    <h4>{t("footer_newsletter")}</h4>
                    <div className="social">
                        <a target="_blank" rel="noreferrer"href="https://narativlab.gitbook.io/narativlab/"><GITBOOK /></a>
                        <a target="_blank"href="https://discord.gg/YaNcKuU5dS"><DISCORD /></a>
                        <a target="_blank" rel="noreferrer"href="https://twitter.com/narativlab"><TWITTER /></a>
                        <a target="_blank" rel="noreferrer"href="https://medium.com/@narativlab"><MEDIUM /></a>
                        <a target="_blank" rel="noreferrer"href="https://www.instagram.com/narativlab/"><INSTA /></a>                     
                    </div>
                    <div className="newsletter_input">
                            <input ref={emailInput} placeholder={t("footer_placeholder")} type="email" name="EMAIL" classnName="required email" id="mce-EMAIL" required onChange={(e)=>setEmail(e.target.value)}></input>
                            <button ref={submitButton} type="submit" name="subscribe" id="mc-embedded-subscribe">Subscribe</button>
                    </div>
                </form>
            </div>
        </footer>
    )
}