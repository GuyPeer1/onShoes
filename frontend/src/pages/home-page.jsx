import React, { useEffect, useState } from "react"

import { socketService } from "../services/socket.service"
import video from '../assets/video.mp4'

export function HomePage() {
    const [isPersonAround, setIsPersonAround] = useState(false)

    useEffect(() => {
        socketService.on('person-join', () => {
            console.log('detected')
            setIsPersonAround(true)
        })
        
        socketService.on('person-left', () => {
            console.log('left')
            setIsPersonAround(false)
        })
    }, [])

    return (
        <section className="home-page">
          <div className="video-container">
            <video autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <h1 className="main-txt">
            {isPersonAround ? "place any shoe on the reader" : "Come closer and have a look"}
          </h1>
        </section>
      )
      
}
