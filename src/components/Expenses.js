import React, { useState } from 'react';

const Expenses = ({ people, expenses, setExpenses }) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [splitAmong, setSplitAmong] = useState([]);

  const handleAddExpense = () => {
    if (payer && amount && reason && splitAmong.length > 0) {
      const newExpense = { payer, amount: parseFloat(amount), reason, splitAmong };
      setExpenses([...expenses, newExpense]);
      setPayer('');
      setAmount('');
      setReason('');
      setSplitAmong([]);
    }
  };

  const handleCheckboxChange = (person) => {
    setSplitAmong((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <div>
        <label>
          Who Paid:
          <select value={payer} onChange={(e) => setPayer(e.target.value)}>
            <option value="" disabled>Select person</option>
            {people.map((person, index) => (
              <option key={index} value={person}>{person}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Reason:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>Split Among:</label>
        {people.map((person, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={splitAmong.includes(person)}
              onChange={() => handleCheckboxChange(person)}
            />
            {person}
          </div>
        ))}
      </div>
      <button onClick={handleAddExpense}>Add Expense</button>

      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.payer} paid {expense.amount} for {expense.reason}, split among {expense.splitAmong.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
