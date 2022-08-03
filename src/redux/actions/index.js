export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_VALOR = 'GET_VALOR';
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

const getExpenses = (expenses) => (
  {
    type: GET_EXPENSES,
    expenses,
  }
);

export const getValor = (valor) => (
  {
    type: GET_VALOR,
    valor,
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
