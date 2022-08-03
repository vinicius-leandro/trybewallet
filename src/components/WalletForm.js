import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, fetchingApi } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      inputDescription: '',
      inputCurrency: 'USD',
      inputMethod: 'Dinheiro',
      inputTag: 'Alimentação',
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
    const { dispatch, expenses } = this.props;
    event.preventDefault();
    const expense = {
      id: expenses.length,
      value: inputValue,
      description: inputDescription,
      currency: inputCurrency,
      method: inputMethod,
      tag: inputTag,
    };
    dispatch(fetchCurrency(expense));
    this.clearInputs();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { inputValue, inputDescription } = this.state;
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
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </section>

          <section>
            <button
              type="submit"
              onClick={ this.handleButtonClick }
            >
              Adicionar despesa
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
});

WalletForm.propTypes = {
  fetchingApi: propTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
