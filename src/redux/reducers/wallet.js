import { GET_CURRENCIES, GET_EXPENSES, CHANGE_EXPENSES, GO_TO_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  case CHANGE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case GO_TO_EDIT:
    return {
      ...state,
      editor: !state.editor,
      idToEdit: action.id,
    };
  default:
    return state;
  }
};

export default wallet;
