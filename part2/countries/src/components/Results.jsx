﻿import {useState } from 'react'
import CountryDisplay from "./CountryDisplay";

const Results = ({ result }) => {
    const [show, setShow] = useState(false)
    const handleShowClick = () => {
        setShow(!show)
    }
    return (
        <li>
            {result.name.common} <button onClick={handleShowClick}>show</button>
            {show === true && <CountryDisplay key={result.name.common} result={result}/>}
        </li>
    )
}

export default Results