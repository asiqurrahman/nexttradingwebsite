const Postdescription = () => {
    return (
        <div className="postdescription">
            <div>
                <label>Description</label>
                <p>Descripe what you have...</p>
                <textarea id="tradedescription" name="traddescription" rows="4" cols="50" required/>
            </div>
            <div>
                <label>Description</label>
                <p>Descripe what you want</p>
                <textarea id="tradedescription" name="wanteddescription" rows="4" cols="50" required/>
            </div>
        </div>
    )
}

export default Postdescription
