import React, { useState, useEffect } from "react"
import { OneShoeStats } from '../cmps/one-shoe-stats.jsx'
import { OneShoeDetails } from '../cmps/one-shoe-details.jsx'
import { OneShoeSuits } from '../cmps/one-shoe-suits.jsx'
import { dataService } from '../services/data.service.js'
import { shoeService } from '../services/shoe.service.js'
import { socketService } from '../services/socket.service'
import { HomePage } from "./home-page.jsx"

export function OneShoePage() {
    //The app first render will be with the next RFID:
    const [data, setData] = useState()
    const [firstRfid, setFirstRfid] = useState('')
    const [secondRfid, setSecondRfid] = useState('')
    const [firstShoe, setFirstShoe] = useState(null)
    const [secondShoe, setSecondShoe] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await dataService.loadData()
                setData(data)
            } catch (error) {
                console.error("Error occurred while fetching data:", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (firstRfid) {
            const shoe = dataService.getShoe(data, firstRfid)
            if (shoe !== firstShoe) setFirstShoe(prevShoe => ({ ...prevShoe, ...shoe }) || null)
        }
        if (secondRfid) {
            const shoe = dataService.getShoe(data, secondRfid)
            if (shoe !== secondShoe) {
                setSecondShoe(prevShoe => ({ ...prevShoe, ...shoe }) || null)}
        }
    }, [firstRfid, secondRfid])

    useEffect(() => {
        let firstRfidTimer = null
        let secondRfidTimer = null

        function resetFirstRfid() {
            setFirstRfid('')
            setFirstShoe(null)
            clearTimeout(firstRfidTimer)
        }
        
        function resetSecondRfid() {
            setSecondRfid('')
            setSecondShoe(null)
            clearTimeout(secondRfidTimer)
        }

        function handleRFIDChange(value, rfidType) {
            if (value.length === 24) {
                if (rfidType === 'first') {
                    setFirstRfid(value)
                    clearTimeout(firstRfidTimer)
                    firstRfidTimer = setTimeout(resetFirstRfid, 3000) // Reset after 5 seconds of no events
                }
                else if (rfidType === 'second') {
                    setSecondRfid(value)
                    clearTimeout(secondRfidTimer)
                    secondRfidTimer = setTimeout(resetSecondRfid, 3000) // Reset after 5 seconds of no events
                }
            }
        }

        socketService.on('rfid-first', (rfidTag) => {
            handleRFIDChange(rfidTag, 'first')
        })

        socketService.on('rfid-second', (rfidTag) => {
            handleRFIDChange(rfidTag, 'second')
        })

        return () => {
            clearTimeout(firstRfidTimer)
            clearTimeout(secondRfidTimer)
        }
    }, [])

    return (
        //Deafult: Display background movie
        (!firstShoe && !secondShoe) && (
            <HomePage />
        ) ||
        //Case 1: Only first shoe exist
        (firstShoe && !secondShoe) && (
            <section className='one-shoe-page'>
                <OneShoeStats currShoe={firstShoe} />
                <OneShoeDetails currShoe={firstShoe} />
                <OneShoeSuits currShoe={firstShoe} />
            </section>
        )
        //Case 2: Only second shoe exist
        || (!firstShoe && secondShoe) && (
            <section className='one-shoe-page'>
                <OneShoeStats currShoe={secondShoe} />
                <OneShoeDetails currShoe={secondShoe} />
                <OneShoeSuits currShoe={secondShoe} />
            </section>
        )
        //Case 3: Both shoes exist - compare page.
        || (firstShoe && secondShoe) && (
            <section className='two-shoes-page'>
                <OneShoeStats className='first-shoe' currShoe={firstShoe} />
                <OneShoeStats className='second-shoe' currShoe={secondShoe} />
            </section>
        )
    )
}

{/* Paste RFID CODE HERE:
        <input
            type="text"
            className="rfid-input"
            autoFocus
            onChange={(event) => setNewRFID(event.target.value)}
            value={newRFID}
            onKeyUp={(event) => handleRFIDChange(event.target.value)}
            style={{ opacity: 1 }}

        /> */}