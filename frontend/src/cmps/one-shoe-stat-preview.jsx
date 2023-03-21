
export function StatPreview({ stat }) {

    const Bar = () => <div className="bar" />

    return (
        <section className="stat-preview">
            <div className="stat-type">{stat.type}</div>
            <div className="bars">
                <div className="duo">
                    <Bar />
                    <span className="first-bar">{stat.firstOption}</span>
                </div>
                <div className="duo">
                    <Bar />
                    <span className="second-bar">{stat.secondOption}</span>
                </div>
                <div className="duo">
                    <Bar />
                    <span className="third-bar">{stat.thirdOption}</span>
                </div>
            </div>

        </section >
    )
}