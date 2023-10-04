import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDate } from "../helpers";

import SavingIcon from "../img/icono_ahorro.svg";
import HomeIcon from "../img/icono_casa.svg";
import MealIcon from "../img/icono_comida.svg";
import ExpensesIcon from "../img/icono_gastos.svg";
import LeisureIcon from "../img/icono_ocio.svg";
import HealthIcon from "../img/icono_salud.svg";
import SubscriptionsIcon from "../img/icono_suscripciones.svg";

const icons = {
  saving: SavingIcon,
  meal: MealIcon,
  home: HomeIcon,
  expenses: ExpensesIcon,
  leisure: LeisureIcon,
  health: HealthIcon,
  subscriptions: SubscriptionsIcon,
};

function Expense({ expense, setEditExpense, deleteExpense }) {
  const { category, name, amount, id, date } = expense;
 
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteExpense(id)}
        destructive={true}>
        Delete
      </SwipeAction>
    </TrailingActions>
  )
  
  return (
    <SwipeableList>
      <SwipeableListItem 
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <div className="gasto sombra" key={id}>
          <div className="contenido-gasto">
            <img src={icons[category]} alt="Expense icon" />

            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Added: {""}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default Expense;
