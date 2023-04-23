import React, { useState, useEffect } from "react"
import { OneShoeStats } from '../cmps/one-shoe-stats.jsx'
import { OneShoeDetails } from '../cmps/one-shoe-details.jsx'
import { OneShoeSuits } from '../cmps/one-shoe-suits.jsx'
import { dataService } from '../services/data.service.js'
import { socketService } from '../services/socket.service'

export function OneShoePage() {
    //The app first render will be with the next RFID:
    const [RFID, setRFID] = useState("303246280b03f780000003a0")
    const [data, setData] = useState()

    const [currShoe, setCurrShoe] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const data = await dataService.loadData()
                setData(data)
                const shoe = dataService.getShoe(data, RFID)
                setCurrShoe(shoe)
                setLoading(false)
            } catch (error) {
                console.error("Error occurred while fetching data:", error)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        if (!loading && currShoe) {
            const shoe = dataService.getShoe(data, RFID)
            if (shoe !== currShoe) setCurrShoe(shoe)
        }
    }, [RFID])

    ///socketlistaners
    useEffect(() => {
        socketService.on('rfid', (rfidTag) => {
            handleRFIDChange(rfidTag)
        })

    }, [])

    function handleRFIDChange(value) {
        if (value.length === 24) {
            setRFID(value)
        }
    }

    return (
        <section className='one-shoe-page'>
            {currShoe && (
                <>
                    <OneShoeStats currShoe={currShoe} />
                    <OneShoeDetails currShoe={currShoe} />
                    <OneShoeSuits currShoe={currShoe} />
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
                </>
            )}
        </section>
    )
}

