import React, { useState, useEffect } from "react";
import { StatPreview } from '../cmps/one-shoe-stat-preview.jsx'
import * as XLSX from "xlsx";
import dataFile from '../assets/data.xlsx'

export function OneShoeStats() {
    const [currentRow, setCurrentRow] = useState(null)
    const RFID = '303246280B06EFC0000002E9'
    
    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const response = await fetch(dataFile)
        const blob = await response.blob()
        const reader = new FileReader()
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
            setCurrentRow(getCurrentRow(rows))
        }
        reader.readAsBinaryString(blob)
    }

    function getCurrentRow(rows) {
        const rfidColumnIndex = rows[0].indexOf('rfid')
        const filteredRow = rows.find(row => row[rfidColumnIndex] === RFID)
        return filteredRow
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
        <section className="one-shoe-stats">
            <div className="head">Run on clouds. <div className="subhead">Swiss Engineering</div></div>
            {stats.map((stat) => (
                <StatPreview key={stat.id} stat={stat} />
            ))}
        </section >
    )
}
