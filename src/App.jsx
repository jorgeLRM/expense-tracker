import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Expenses from "./components/Expenses";
import Filter from "./components/Filter";
import { generateId } from "./helpers";
import NewExpenseIcon from "./img/nuevo-gasto.svg";

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );

  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState('');
  const [expensesFiltered, setExpensesFiltered] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 300);
    }
  }, [editExpense]);

  useEffect(()=>{
    localStorage.setItem('budget', budget ?? 0);
  },[budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if (filter) {
      const expensesFiltered = expenses.filter(expense => expense.category === filter)

      setExpensesFiltered(expensesFiltered);
    }
  }, [filter])

  useEffect(() => {
    const budgetLocalStorage = Number(localStorage.getItem('budget')) ?? 0;
    if (budgetLocalStorage > 0) {
      setIsValidBudget(true);
    }
  },[])

  const handleNewExpense = () => {
    setModal(true);
    setEditExpense({});

    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  };

  const saveExpense = (newExpense) => {
    if (newExpense.id) {
      const expensesUpdated = expenses.map(expenseState => expenseState.id === newExpense.id ? newExpense : expenseState);
      setExpenses(expensesUpdated)
      setEditExpense({})
    } else {
      newExpense.id = generateId();
      newExpense.date = Date.now();
      setExpenses([...expenses, newExpense]);
    }

    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const deleteExpense = id => {
    const expensesUpdated = expenses.filter(expense => expense.id !== id);
    setExpenses(expensesUpdated);
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter 
              filter={filter}
              setFilter={setFilter}
            />
            <Expenses setEditExpense={setEditExpense} expenses={expenses} deleteExpense={deleteExpense} filter={filter} expensesFiltered={expensesFiltered}/>
          </main>
          <div className="nuevo-gasto">
            <img
              src={NewExpenseIcon}
              alt="New Expense Icon"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      )}
    </div>
  );
}

export default App;
