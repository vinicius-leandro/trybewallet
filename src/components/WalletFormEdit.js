import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchingApi, changeExpenses, goToEdit } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    const { idToEdit, expenses } = this.props;

    const expenseEditing = expenses.find((expense) => expense.id === idToEdit);

    this.state = {
      inputValue: expenseEditing.value,
      inputDescription: expenseEditing.description,
      inputCurrency: expenseEditing.currency,
      inputMethod: expenseEditing.method,
      inputTag: expenseEditing.tag,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchingApi());
  }

  clearInputs = () => {
    this.setState({
      inputValue: '',
      inputDescription: '',
    });
  }

  handleButtonClick = (event) => {
    const { inputValue, inputDescription,
      inputCurrency, inputMethod, inputTag } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;
    const { exchangeRates } = expenses[0];
    event.preventDefault();
    const expense = {
      id: idToEdit,
      value: inputValue,
      description: inputDescription,
      currency: inputCurrency,
      method: inputMethod,
      tag: inputTag,
      exchangeRates,
    };
    expenses.splice(idToEdit, 1, expense);
    dispatch(changeExpenses(expenses));
    this.clearInputs();
    dispatch(goToEdit(0));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { inputValue, inputDescription,
      inputCurrency, inputMethod, inputTag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <section>
            <label htmlFor="number">
              Valor:
              <input
                type="number"
                data-testid="value-input"
                id="number"
                name="inputValue"
                value={ inputValue }
                onChange={ this.handleChange }
              />
            </label>
          </section>

          <section>
            <label htmlFor="description">
              Descrição
              <input
                type="text"
                data-testid="description-input"
                id="description"
                name="inputDescription"
                value={ inputDescription }
                onChange={ this.handleChange }
              />
            </label>
          </section>

          <section>
            Moedas:
            <select
              data-testid="currency-input"
              name="inputCurrency"
              onChange={ this.handleChange }
              value={ inputCurrency }
            >
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                    value={ currency }
                  >
                    {currency}
                  </option>))
              }
            </select>
          </section>

          <section>
            Método de pagamento:
            <select
              data-testid="method-input"
              name="inputMethod"
              onChange={ this.handleChange }
              value={ inputMethod }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </section>

          <section>
            Categoria:
            <select
              data-testid="tag-input"
              name="inputTag"
              onChange={ this.handleChange }
              value={ inputTag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </section>

          <section>
            <button
              type="submit"
              onClick={ this.handleButtonClick }
            >
              Editar despesa
            </button>
          </section>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  fetchingApi: propTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
