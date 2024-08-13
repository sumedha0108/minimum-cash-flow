import React, { useState } from 'react';

const AddPeople = ({ people, setPeople }) => {
  const [name, setName] = useState('');

  const handleAddPerson = () => {
    if (name && !people.includes(name)) {
      setPeople([...people, name]);
      setName('');
    }
  };

  const handleRemovePerson = (person) => {
    setPeople(people.filter((p) => p !== person));
  };

  return (
    <div className="container">
      <h2>Add People</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddPerson}>Add</button>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            {person}
            <button className="delete" onClick={() => handleRemovePerson(person)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPeople;
