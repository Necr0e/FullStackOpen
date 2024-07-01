const Filter = ({search, onChange}) => {
    return (
        <div>
            filter shown with <input value={search} name="search" onChange={onChange} />
        </div>
    )
}

export default Filter