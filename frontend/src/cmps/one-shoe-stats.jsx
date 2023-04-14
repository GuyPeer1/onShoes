import React from "react"
import { StatPreview } from '../cmps/one-shoe-stat-preview.jsx'


export function OneShoeStats({currStats, currShoe}) {
    console.log(currShoe)
   
    return (
        <section className="one-shoe-stats">
            <div className="head">Run on clouds. <div className="subhead">Swiss Engineering</div></div>
            {currStats && currStats.map((currStat) => (
                currStat && <StatPreview key={currStat.id} currStat={currStat} shoe={currShoe} />
            ))}
        </section>
    )

}
