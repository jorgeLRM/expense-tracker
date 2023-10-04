import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

function ControlBudget({ expenses, setExpenses, budget, setBudget, setIsValidBudget }) {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, currentExpense) => currentExpense.amount + total,
      0
    );
    const totalAvailable = budget - totalSpent;

      const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

    setAvailable(totalAvailable);
    setSpent(totalSpent);
    setTimeout(() => {
      setPercentage(newPercentage)
    }, 500);
  }, [expenses]);

  const formatMoney = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleRestartApp = () => {
    const result = confirm('Do you want to restart your budget and expenses?');
    
    if (result) {
      setExpenses([])
      setBudget(0)
      setIsValidBudget(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>

        <CircularProgressbar 
          styles={buildStyles({
            pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
          })}
          value={percentage}
          text={`${percentage}% Spent`}/>

      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button"
        onClick={handleRestartApp}>
          Restart App
        </button>

        <p>
          <span>Presupuesto: </span> {formatMoney(budget)}
        </p>

        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Available: </span> {formatMoney(available)}
        </p>

        <p>
          <span>Spent: </span> {formatMoney(spent)}
        </p>
      </div>
    </div>
  );
}

export default ControlBudget;
