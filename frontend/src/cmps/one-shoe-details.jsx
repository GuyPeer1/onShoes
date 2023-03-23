import shoePhoto from '../assets/img/shoe.png'

export function OneShoeDetails({currShoe}) {
    const imgUrlIndex = currShoe[0].indexOf('imgUrl')
    const imgUrl = currShoe[1][imgUrlIndex]

    const descIndex = currShoe[0].indexOf('desc')
    const desc = currShoe[1][descIndex]

    return (
        <section className="one-shoe-details">
            <img className="shoe-img" src={imgUrl} />
            <div className="shoe-info">
                <span className="type">Cloudsurfer</span>
                <span className="main-info">
                    {desc}
                </span>
            </div>
        </section >
    )
}