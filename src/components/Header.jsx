import NewBudget from "./NewBudget";
import ControlBudget from "./ControlBudget";

function Header({expenses, budget, setBudget, isValidBudget, setIsValidBudget, setExpenses }) {
  return (
    <header>
      <h1>Expense Tracker</h1>

        {isValidBudget ? (
            <ControlBudget
              expenses={expenses}
              setExpenses={setExpenses}
              budget={budget}
              setBudget={setBudget}
              setIsValidBudget={setIsValidBudget}/>
        ) : (
            <NewBudget budget={budget} setBudget={setBudget} setIsValidBudget={setIsValidBudget}/>
        )}
    </header>
  );
}

export default Header;
