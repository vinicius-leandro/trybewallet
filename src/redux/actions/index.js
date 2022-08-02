export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILURE_API = 'FAILURE_API';
const URL = 'https://economia.awesomeapi.com.br/json/all';

export const changeUserEmail = (email) => (
  {
    type: USER_LOGIN,
    email,
  }
);

export const getCurrencies = (data) => (
  {
    type: GET_CURRENCIES,
    data,
  }
);

export const failureApi = (error) => (
  {
    type: FAILURE_API,
    error,
  }
);

export const fetchingApi = () => async (dispatch) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const dataArray = Object.values(data);
    const filteredData = dataArray.filter((currency) => currency.codein !== 'BRLT')
      .map((currencyMap) => currencyMap.code);
    dispatch(getCurrencies(filteredData));
  } catch (error) {
    dispatch(failureApi(error));
  }
};
