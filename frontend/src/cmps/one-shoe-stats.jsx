import { StatPreview } from '../cmps/one-shoe-stat-preview.jsx'

export function OneShoeStats() {
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