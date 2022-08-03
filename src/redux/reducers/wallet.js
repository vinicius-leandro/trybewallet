import { GET_CURRENCIES, GET_EXPENSES, GET_VALOR } from '../actions';

const INITIAL_STATE = {
  valor: 0,
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case GET_VALOR:
    return {
      ...state,
      valor: action.valor,
    };
  default:
    return state;
  }
};

export default wallet;
