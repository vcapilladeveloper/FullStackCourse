const Persons = ({persons, newFilter, deletePerson}) => {
    return (
        <ul>
        {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => 
        <li key={person.id}>{`${person.name} ${person.number}`} 
        <button onClick={() => deletePerson(person)}>
          delete
        </button>
          </li>)}
      </ul>
    )
}

export default Persons