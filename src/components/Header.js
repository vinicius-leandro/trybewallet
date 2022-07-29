import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, valor } = this.props;
    return (
      <div>
        <section>
          <p data-testid="email-field">
            { `Email: ${email}` }
          </p>
        </section>
        <section>
          <p data-testid="total-field">
            { `Despesa Total: R$ ${valor}` }
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
  valor: state.wallet.valor,
});

Header.propTypes = {
  email: PropTypes.string,
  valor: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
