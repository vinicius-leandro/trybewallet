import { GET_CURRENCIES, GET_EXPENSES } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
