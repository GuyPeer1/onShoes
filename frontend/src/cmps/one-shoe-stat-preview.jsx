export function StatPreview({ currStat }) {

    const Bar = ({ chosen }) => <div className={`bar ${chosen ? "chosen" : ""}`} />

    return (
        <section className="stat-preview">
            <div className="stat-type">{currStat.type}</div>
            <div className="bars">
                <div className="duo">
                    <Bar chosen={currStat.firstOption === currStat.chosen} />
                    <span className={`first-bar ${currStat.firstOption === currStat.chosen ? "chosen" : ""}`}>{currStat.firstOption}</span>
                </div>
                <div className="duo">
                    <Bar chosen={currStat.secondOption === currStat.chosen} />
                    <span className={`second-bar ${currStat.secondOption === currStat.chosen ? "chosen" : ""}`}>{currStat.secondOption}</span>
                </div>
                <div className="duo">
                    <Bar chosen={currStat.thirdOption === currStat.chosen} />
                    <span className={`third-bar ${currStat.thirdOption === currStat.chosen ? "chosen" : ""}`}>{currStat.thirdOption}</span>
                </div>
            </div>
        </section>
    )
}
