import React from 'react'
import Person from "./Person";

const People = ({persons, query}) => {
    const lookup = person => person.name.toLowerCase().includes(query.toLowerCase())
    const people = persons.filter(lookup)
    return people.map(person =>
    <Person key={person.name} person={person}/>)}

export default People