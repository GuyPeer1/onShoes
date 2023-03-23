import logoPhoto from '../assets/img/logo.png'
import orangePhoto from '../assets/img/orange.png'
import runnerPhoto from '../assets/img/runner.png'

export function OneShoeSuits({currShoe}) {
    console.log(currShoe)
    return (
        <section className="one-shoe-suits">
            <img className="logo-img" src={logoPhoto} />
            <img className="orange-img" src={orangePhoto} />
            <span className="info-he">:מתאים ל</span>

            <span className="main-txt">ריצות כביש, אימונים, תחרות, ריצות קצרות עד מרתון</span>
            <img className="orange-img" src={orangePhoto} />

            <span className="video-txt">Video clip</span>
            <img className="runner-img" src={runnerPhoto} />
        </section >
    )
}