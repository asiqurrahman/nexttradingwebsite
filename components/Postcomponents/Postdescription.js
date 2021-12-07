const Postdescription = () => {
    return (
        <div className="postdescription">
            <div>
                <label>Description</label>
                <p>Descripe what you have...</p>
                <textarea id="tradedescription" name="tradedescription" rows="4" cols="50" />
            </div>
            <div>
                <label>Description</label>
                <p>Descripe what you want</p>
                <textarea id="tradedescription" name="wanteddescription" rows="4" cols="50"/>
            </div>
        </div>
    )
}

export default Postdescription
