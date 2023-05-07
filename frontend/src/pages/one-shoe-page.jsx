import React, { useState, useEffect } from "react"
import { HomePage } from "./home-page.jsx"
import { OneShoeStats } from '../cmps/one-shoe-stats.jsx'
import { OneShoeDetails } from '../cmps/one-shoe-details.jsx'
import { OneShoeSuits } from '../cmps/one-shoe-suits.jsx'

import { dataService } from '../services/data.service.js'
import { socketService } from '../services/socket.service.js'

export function OneShoePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [shoeData, setShoeData] = useState()
    //The app first render will be with the next RFID:
    const [firstRfid, setFirstRfid] = useState('')
    const [secondRfid, setSecondRfid] = useState('')
    const [firstShoe, setFirstShoe] = useState(null)
    const [secondShoe, setSecondShoe] = useState(null)

    const MemoizedOneShoeStats = React.memo(OneShoeStats)
    const MemoizedOneShoeDetails = React.memo(OneShoeDetails)
    const MemoizedOneShoeSuits = React.memo(OneShoeSuits)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await dataService.query()
                setShoeData(data)
                setIsLoading(false)
            } catch (error) {
                console.error("Error occurred while fetching data:", error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (firstRfid) {
            const shoe = dataService.getShoe(shoeData, firstRfid)
            if (!shoe[1]){
                shoe[1] = [,':( Shoe is not available']
            }
            if (shoe !== firstShoe) setFirstShoe(prevShoe => ({ ...prevShoe, ...shoe }) || null)
        }
        if (secondRfid) {
            const shoe = dataService.getShoe(shoeData, secondRfid)
            if (!shoe[1]){
                shoe[1] = [,':( Shoe is not available']
            }
            if (shoe !== secondShoe) {
                setSecondShoe(prevShoe => ({ ...prevShoe, ...shoe }) || null)
            }
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
                    firstRfidTimer = setTimeout(resetFirstRfid, 3000000) // Reset after 5 seconds of no events
                }
                else if (rfidType === 'second') {
                    setSecondRfid(value)
                    clearTimeout(secondRfidTimer)
                    secondRfidTimer = setTimeout(resetSecondRfid, 3000000) // Reset after 5 seconds of no events
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
        <>
            {isLoading && <div>Loading Data, please wait :)</div>}

            {!firstShoe && !secondShoe && !isLoading && (
                <HomePage />
            )}

            {firstShoe && !secondShoe && !isLoading && (
                <section className='one-shoe-page'>
                    <MemoizedOneShoeStats currShoe={firstShoe} />
                    <MemoizedOneShoeDetails currShoe={firstShoe} />
                    <MemoizedOneShoeSuits currShoe={firstShoe} />
                </section>
            )}

            {!firstShoe && secondShoe && !isLoading && (
                <section className='one-shoe-page'>
                    <MemoizedOneShoeStats currShoe={secondShoe} />
                    <MemoizedOneShoeDetails currShoe={secondShoe} />
                    <MemoizedOneShoeSuits currShoe={secondShoe} />
                </section>
            )}
            
            {firstShoe && secondShoe && !isLoading && (
                <section className='two-shoes-page'>
                    <MemoizedOneShoeStats className="first-shoe" currShoe={firstShoe} />
                    <MemoizedOneShoeStats className="second-shoe" currShoe={secondShoe} />
                </section>
            )}
        </>
    )
}

