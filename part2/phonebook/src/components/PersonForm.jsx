const PersonForm = ({ onFormSubmit, onNameChange, onNumberChange, nameValue, numberValue }) => {
    return (
        <form onSubmit={onFormSubmit}>
            <div>
                name: <input value={nameValue} onChange={onNameChange}/>
           </div>
            <div>
                number: <input value={numberValue} onChange={onNumberChange}/>
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}

export default PersonForm