export default function BakeryItem({item}){
    return (
        <div>
            <h2>{item.name}</h2>
            <div className="descimg">
                <div>
                    <img
                    src={item.image}
                    style={{
                    margin: 20,
                    width: 100,
                    height: 100
                    }}
                    />
                </div>
                <div>
                    <div className="desc">
                        <h3>${item.price}</h3>
                        <h3>Calories: {item.cals}</h3>
                    </div>
                        <h3>Type: {item.type}</h3>
                        <h3>Dietary Restrictions: {item.dietary}</h3>
                </div>
            </div>
            <p>{item.description}</p>
        </div>
    )
}