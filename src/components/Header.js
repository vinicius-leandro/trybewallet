import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const valor = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      return acc + parseFloat(value * exchangeRates[currency].ask);
    }, 0);
    return (
      <div>
        <section>
          <p data-testid="email-field">
            { `Email: ${email}` }
          </p>
        </section>
        <section>
          <p> Despesa Total: R$ </p>
          <p data-testid="total-field">
            { valor.toFixed(2) }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
