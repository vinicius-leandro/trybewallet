import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchingApi } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchingApi());
  }

  render() {
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
              />
            </label>
          </section>

          <section>
            Moedas:
            <select
              data-testid="currency-input"
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
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </section>

          <section>
            Categoria:
            <select
              data-testid="tag-input"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </section>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  fetchingApi: propTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
