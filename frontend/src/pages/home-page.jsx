import React from "react"
import video from '../assets/video.mp4'

export function HomePage() {

    return (
        <section className="home-page">
            <video autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
        </section>
    )
}
