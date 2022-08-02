import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeUserEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disable: true,
    };
  }

  goToWallet = () => {
    const { history } = this.props;
    history.push('/carteira');
  }

  handleButtonClick = (event) => {
    const { dispatch } = this.props;
    const { email } = this.state;

    event.preventDefault();

    this.setState({
      email: '',
    });

    dispatch(changeUserEmail(email));
    this.goToWallet();
  }

  handleEnableButton = () => {
    const { email, password } = this.state;
    const minLengthPassword = 6;

    if (email.includes('@')
      && email.includes('.com')
      && password.length >= minLengthPassword) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleEnableButton());
  }

  render() {
    const { email, password, disable } = this.state;
    return (
      <div>
        <form>
          <section>
            <label htmlFor="email">
              Email:
              <input
                data-testid="email-input"
                type="email"
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </section>
          <section>
            <label htmlFor="password">
              Senha:
              <input
                data-testid="password-input"
                type="password"
                id="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
          </section>
          <section>
            <button
              type="submit"
              onClick={ this.handleButtonClick }
              disabled={ disable }
            >
              Entrar
            </button>
          </section>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect()(Login);
