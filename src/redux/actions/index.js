export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_VALOR = 'GET_VALOR';
export const CHANGE_EXPENSES = 'CHANGE_EXPENSES';
export const GO_TO_EDIT = 'GO_TO_EDIT';
const URL = 'https://economia.awesomeapi.com.br/json/all';

export const changeUserEmail = (email) => (
  {
    type: USER_LOGIN,
    email,
  }
);

const getCurrencies = (data) => (
  {
    type: GET_CURRENCIES,
    data,
  }
);

export const getExpenses = (expenses) => (
  {
    type: GET_EXPENSES,
    expenses,
  }
);

export const changeExpenses = (expenses) => (
  {
    type: CHANGE_EXPENSES,
    expenses,
  }
);

export const goToEdit = (id) => (
  {
    type: GO_TO_EDIT,
    id,
  }
);

export const fetchingApi = () => async (dispatch) => {
  const response = await fetch(URL);
  const data = await response.json();
  const dataArray = Object.values(data);
  const filteredData = dataArray.filter((currency) => currency.codein !== 'BRLT')
    .map((currencyMap) => currencyMap.code);
  dispatch(getCurrencies(filteredData));
};

export const fetchCurrency = (expense) => async (dispatch) => {
  const response = await fetch(URL);
  const data = await response.json();
  delete data.USDT;
  expense.exchangeRates = data;
  dispatch(getExpenses(expense));
};
