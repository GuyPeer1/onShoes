import React, { useState, useEffect } from "react"
import { OneShoeStats } from '../cmps/one-shoe-stats.jsx'
import { OneShoeDetails } from '../cmps/one-shoe-details.jsx'
import { OneShoeSuits } from '../cmps/one-shoe-suits.jsx'
import { dataService } from '../services/data.service.js'
import { socketService } from '../services/socket.service'

export function OneShoePage() {
    //The app first render will be with the next RFID:
    const [data, setData] = useState()
    const [firstRfid, setFirstRfid] = useState("303246280b03f780000003a0")
    const [secondRfid, setSecondRfid] = useState(null)

    const [firstShoe, setFirstShoe] = useState(null)
    const [secondShoe, setSecondShoe] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const data = await dataService.loadData()
                setData(data)
                const shoe = dataService.getShoe(data, firstRfid)
                setFirstShoe(shoe)
                setLoading(false)
            } catch (error) {
                console.error("Error occurred while fetching data:", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!loading && firstShoe) {
            const shoe = dataService.getShoe(data, firstRfid)
            if (shoe !== firstShoe) setFirstShoe(shoe)
        }
        if (secondRfid !== null) {
            const shoe = dataService.getShoe(data, secondRfid)
            setSecondShoe(shoe)
        }
    }, [firstRfid, secondRfid])

    ///socketlistaners
    useEffect(() => {
        socketService.on('rfid-first', (rfidTag) => {
            handleRFIDChange(rfidTag, 'first')
        })

        socketService.on('rfid-second', (rfidTag) => {
            handleRFIDChange(rfidTag, 'second')
        })

    }, [])

    function handleRFIDChange(value, rfidType) {
        if (value.length === 24) {
            if (rfidType === 'first') setFirstRfid(value)
            else if (rfidType === 'second') setSecondRfid(value)
        }
    }

    return (
        (firstShoe && !secondShoe) && (
            <section className='one-shoe-page'>
                <OneShoeStats currShoe={firstShoe} />
                <OneShoeDetails currShoe={firstShoe} />
                <OneShoeSuits currShoe={firstShoe} />
            </section>
        )
        || (firstShoe && secondShoe) && (
            <section className='two-shoe-page'>
                <OneShoeStats currShoe={firstShoe} />
                <OneShoeStats currShoe={secondShoe} />
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