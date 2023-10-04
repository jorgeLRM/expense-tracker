import { useState, useEffect } from "react";
import Message from "./Message";
import CloseBtn from "../img/cerrar.svg";

function Modal({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpense,
  editExpense,
  setEditExpense
}) {
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const[date, setDate] = useState('')
  const [id, setId] = useState('');

  useEffect(()=>{
    if (Object.keys(editExpense).length > 0) {
        setName(editExpense.name)
        setAmount(editExpense.amount)
        setCategory(editExpense.category)
        setId(editExpense.id)
        setDate(editExpense.date)
    }
  },[])

  const closeModal = () => {
    setAnimateModal(false);
    setEditExpense({})
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, amount, category].includes("")) {
      setMessage("All fields are required");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    saveExpense({ name, amount, category, id , date});
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CloseBtn} alt="Cerrar modal" onClick={closeModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
      >
        <legend>{editExpense.name ? "Edit expense" : "New expense"}</legend>

        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="name">Expense name</label>

          <input
            id="name"
            type="text"
            placeholder="Add name of expense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="amount">Amount</label>

          <input
            id="amount"
            type="number"
            placeholder="Add amount of expense"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="saving">Saving</option>
            <option value="meal">Meal</option>
            <option value="home">Home</option>
            <option value="expenses">Various expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <input type="submit" value={editExpense.name ? 'Edit expense' : 'Add expense'} />
      </form>
    </div>
  );
}

export default Modal;
