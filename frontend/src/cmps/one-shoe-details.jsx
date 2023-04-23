export function OneShoeDetails({currShoe}) {
    const shoeInfo = currShoe.info
    const imgUrlIndex = shoeInfo[0].indexOf('imgUrl')
    const imgUrl = shoeInfo[1][imgUrlIndex]

    const descIndex = shoeInfo[0].indexOf('desc')
    const typeIndex = shoeInfo[0].indexOf('דגם')
    const desc = shoeInfo[1][descIndex]
    const type = shoeInfo[1][typeIndex]

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