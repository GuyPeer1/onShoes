import shoePhoto from '../assets/img/shoe.png'

export function OneShoeDetails() {
    return (
        <section className="one-shoe-details">
            <img className="shoe-img" src={shoePhoto} />
            <div className="shoe-info">
                <span className="type">Cloudsurfer</span>
                <span className="main-info">
                    משלבת נחיתות רכות וזינוקים מהירים במיוחד ונותן תחושה של ריצה על עננים. סוליית הגומי המיוחדת שלה מאפשרת ביצועים
                    משופרים ומצוידת בדפוס מיוחד לאחיזה משופרת של הקרקע כך שתוכל לרוץ מהר ובבטיחות. קימור הנעל נועד במיוחד לריצה כדי
                    לשמור על תנועת הגל ומהירות גבוהה.
                </span>
            </div>
        </section >
    )
}