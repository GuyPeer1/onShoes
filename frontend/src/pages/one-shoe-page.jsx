import React, { useState, useEffect } from "react";
import { OneShoeStats } from '../cmps/one-shoe-stats.jsx'
import { OneShoeDetails } from '../cmps/one-shoe-details.jsx'
import { OneShoeSuits } from '../cmps/one-shoe-suits.jsx'
import { dataService } from '../services/data.service.js'
import { socketService } from '../services/socket.service'


export function OneShoePage() {

    const [currShoe, setCurrentShoe] = useState(null)
    const [currStats, setCurrStats] = useState(null)
    const [isCurrShoeUpdated, setIsCurrShoeUpdated] = useState(false)
    // const RFID = '303246280B06EFC0000002E9'
    const RFID = '303246280b03e1000098ba83'

    useEffect(() => {
        async function fetchData() {
            const rows = await dataService.loadData()
            setCurrentShoe(getCurrentShoe(rows))
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (currShoe && !isCurrShoeUpdated) {
            setIsCurrShoeUpdated(true)
            addCurrShoeProps()
        }
    }, [currShoe])

    useEffect(() => {
        socketService.emit('check')
        socketService.on('rfid-placed', data => {
            console.log(data)
        })
    },[])


    function getCurrentShoe(rows) {
        const rfidColumnIndex = rows[0].indexOf('rfid')
        const filteredRow = rows.find(row => row[rfidColumnIndex] === RFID)
        return [rows[0], filteredRow]
    }

    function addCurrShoeProps() {
        const headers = currShoe[0]
        const activityIndex = headers.indexOf('activity')
        const surfaceIndex = headers.indexOf('surface')
        const distanceIndex = headers.indexOf('running_distance')
        const dampingIndex = headers.indexOf('damping')
        const compIndex = headers.indexOf('comp')

        const activityValue = currShoe[1][activityIndex]
        const surfaceValue = currShoe[1][surfaceIndex]
        const distanceValue = currShoe[1][distanceIndex]
        const dampingValue = currShoe[1][dampingIndex]
        const compValue = currShoe[1][compIndex]

        const updatedStats = stats.map(stat => {
            switch (stat.type) {
                case 'סוג פעילות':
                    return {
                        ...stat,
                        chosen: activityValue
                    }
                case 'משטח':
                    return {
                        ...stat,
                        chosen: surfaceValue
                    }
                case 'מרחק ריצה':
                    return {
                        ...stat,
                        chosen: distanceValue
                    }
                case 'שיכוך':
                    return {
                        ...stat,
                        chosen: dampingValue
                    }
                case 'תחרות':
                    return {
                        ...stat,
                        chosen: compValue
                    }
                default:
                    return stat
            }
        })
        setCurrStats(updatedStats)
    }

    let stats =
        [
            { type: 'סוג פעילות', id: 1, firstOption: 'טיולים ושטח', secondOption: 'ריצה', thirdOption: 'לכל היום' },
            { type: 'משטח', id: 2, firstOption: 'שטח', secondOption: 'אימון בבית', thirdOption: 'כביש' },
            { type: 'מרחק ריצה', id: 3, firstOption: 'ארוך', secondOption: 'בינוני', thirdOption: 'קצר' },
            { type: 'שיכוך', id: 4, firstOption: 'מקסימלי ', secondOption: 'בינוני', thirdOption: 'קל' },
            { type: 'תחרות', id: 5, firstOption: 'כן', secondOption: 'לא' }
        ]

    return (
        <section className='one-shoe-page'>
            {currShoe && (
                <>
                    <OneShoeStats currStats={currStats} currShoe={currShoe} />
                    <OneShoeDetails currShoe={currShoe} />
                    <OneShoeSuits currShoe={currShoe}/>
                </>
            )}
        </section>
    )
}