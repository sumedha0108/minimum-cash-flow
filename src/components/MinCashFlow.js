import React from 'react';

const MinCashFlow = ({ expenses, people }) => {
  const calculateBalances = () => {
    const balances = {};
    people.forEach((person) => {
      balances[person] = 0;
    });

    expenses.forEach(({ payer, amount, splitAmong }) => {
      const splitAmount = amount / splitAmong.length;
      splitAmong.forEach((person) => {
        if (person !== payer) {
          balances[payer] += splitAmount;
          balances[person] -= splitAmount;
        }
      });
    });

    return balances;
  };

  const balances = people.length > 0 && expenses.length > 0 ? calculateBalances() : {};

  const minCashFlow = (balances) => {
    const netAmounts = Object.values(balances);
    const netPersons = Object.keys(balances);
    const result = [];

    while (true) {
      const maxCredit = netAmounts.reduce((max, amt, i) => (amt > netAmounts[max] ? i : max), 0);
      const maxDebit = netAmounts.reduce((min, amt, i) => (amt < netAmounts[min] ? i : min), 0);

      if (netAmounts[maxCredit] === 0 && netAmounts[maxDebit] === 0) break;

      const min = Math.min(-netAmounts[maxDebit], netAmounts[maxCredit]);
      netAmounts[maxCredit] -= min;
      netAmounts[maxDebit] += min;

      result.push(`${netPersons[maxDebit]} pays ${min.toFixed(2)} to ${netPersons[maxCredit]}`);
    }

    return result;
  };

  const transactions = people.length > 0 && expenses.length > 0 ? minCashFlow(balances) : [];

  return (
    <div>
      <h2>Min Cash Flow</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))}
        </ul>
      ) : (
        <p>No transactions to show</p>
      )}
    </div>
  );
};

export default MinCashFlow;
