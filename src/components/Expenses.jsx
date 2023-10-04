import Expense from "./Expense";

function Expenses({
  expenses,
  setEditExpense,
  deleteExpense,
  filter,
  expensesFiltered,
}) {
  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>{expensesFiltered.length ? "Expenses" : "No expenses yet"}</h2>
          {expensesFiltered.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Expenses" : "No expenses yet"}</h2>
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Expenses;
