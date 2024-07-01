const PersonForm = ({ onSubmit, newName, newNumber, onChange }) => {
    return (
    <form onSubmit={onSubmit}>
        <div>
            name:
            <input value={newName} name="name" onChange={onChange}/> <br/>
            number:
            <input value={newNumber} name="number" onChange={onChange}/>
        </div>
        <div>
            <button type='submit'>add</button>
        </div>
    </form>
        )
    }

    export default PersonForm