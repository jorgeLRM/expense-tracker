import {useState} from 'react'
import Message from './Message';

function NewBudget({budget, setBudget, setIsValidBudget}) {

    const [message, setMessage] = useState('');

    const handleBudget = (e) => {
        e.preventDefault();

        if (!budget || budget < 0) {
            setMessage('Budget is not valid')
            return 
        }
        setMessage('');
        setIsValidBudget(true);
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handleBudget} className='formulario'>
            <div className='campo'>
                <label>Set Budget</label>

                <input
                    className='nuevo-presupuesto' 
                    type="number"
                    placeholder='Add your budget'
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                />
            </div>

            <input type="submit" value="Add" />

            {message && <Message type="error">{message}</Message>}
        </form>
    </div>
  )
}

export default NewBudget
