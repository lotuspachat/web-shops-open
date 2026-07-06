function shopcard(props){
    return (
        <div className="shop-card">
            <h2>{props.name}</h2>
            <p>Status: {props.status}</p>
            <p>Stocks available: {props.stocks}</p>
        </div>
    );
}
export default shopcard;