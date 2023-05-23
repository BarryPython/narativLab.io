//style import
import "../style/dotMenu.scss"

export default function DotMenu({dot}){

    return(
        <div className="dotMenu desktop-only">
            <a href="/#landing" className={dot === "landing" ? "active" : ""}>menu</a>
            <a href="/#industry" className={dot === "industry" ? "active" : ""}>menu</a>
            <a href="/#figures" className={dot === "figures" ? "active" : ""}>menu</a>
            <a href="/#movie" className={dot === "movie" ? "active" : ""}>menu</a>
            <a href="/#everything" className={dot === "everything" ? "active" : ""}>menu</a>
            <a href="/#tickets" className={dot === "tickets" ? "active" : ""}>menu</a>
            <a href="/#screen" className={dot === "screen" ? "active" : ""}>menu</a>
            <a href="/#dashboard" className={dot === "dashboard" ? "active" : ""}>menu</a>
        </div>
    )
}