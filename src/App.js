import React, { useState } from 'react';
import './styles.css';
import AddPeople from './components/AddPeople';
import Expenses from './components/Expenses';
import MinCashFlow from './components/MinCashFlow';
import { Container, Tabs, Tab, AppBar, Box } from '@mui/material';

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="App">
      <Container className="tabs-container">
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Add People" />
            <Tab label="Expenses" />
            <Tab label="Min Cash Flow" />
          </Tabs>
        </AppBar>
        <Box className="content-container">
          {tabIndex === 0 && <AddPeople people={people} setPeople={setPeople} />}
          {tabIndex === 1 && <Expenses people={people} expenses={expenses} setExpenses={setExpenses} />}
          {tabIndex === 2 && <MinCashFlow expenses={expenses} people={people} />}
        </Box>
      </Container>
    </div>
  );
}

export default App;
