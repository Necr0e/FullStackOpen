const Search = ({searchString, setSearchString}) => {
    return (
        <label>
            Filtered persons:
            <input type='text' value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
        </label>
    )
}

export default Search