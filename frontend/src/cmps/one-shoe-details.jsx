export function OneShoeDetails({currShoe}) {
    const imgUrlIndex = currShoe[0].indexOf('imgUrl')
    const imgUrl = currShoe[1][imgUrlIndex]

    const descIndex = currShoe[0].indexOf('desc')
    const typeIndex = currShoe[0].indexOf('type')
    const desc = currShoe[1][descIndex]
    const type = currShoe[1][typeIndex]


    return (
        <section className="one-shoe-details">
            <img className="shoe-img" src={imgUrl} alt="shoe" />
            <div className="shoe-info">
                <span className="type">{type}</span>
                <span className="main-info">
                    {desc}
                </span>
            </div>
        </section >
    )
}