import { GET_CURRENCIES, FAILURE_API } from '../actions';

const INITIAL_STATE = {
  valor: 0,
  currencies: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };
  case FAILURE_API:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
