import logoPhoto from '../assets/img/logo.png'
import orangePhoto from '../assets/img/orange.png'
import runnerPhoto from '../assets/img/runner.png'

export function OneShoeSuits({currShoe}) {
    const shoeInfo = currShoe.info
    return (
        <section className="one-shoe-suits">
            <img className="logo-img" src={logoPhoto} alt="logo" />
            <img className="orange-img" src={orangePhoto} alt="orange"/>
            <span className="info-he">:מתאים ל</span>

            <span className="main-txt">{shoeInfo[1][4]}</span>
            <span className="main-txt">{shoeInfo[1][5]}</span>
            <img className="orange-img" src={orangePhoto} alt="orange" />

            <span className="video-txt">Video clip</span>
            <img className="runner-img" src={runnerPhoto} alt='runner' />
        </section >
    )
}