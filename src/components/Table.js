import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeExpenses, goToEdit } from '../redux/actions';

class Table extends Component {
  handleDeleteButton = (id) => {
    const { dispatch, expenses } = this.props;
    const filtredExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(changeExpenses(filtredExpenses));
  }

  handleEditButton = (id) => {
    const { dispatch } = this.props;
    dispatch(goToEdit(id));
  }

  render() {
    const { expenses, editor } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {
            expenses.length >= 1 && (
              expenses.map((expense) => (
                <tbody key={ expense.id }>
                  <tr>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{parseFloat(expense.value).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {
                        parseFloat(
                          (expense.exchangeRates[expense.currency].ask),
                        ).toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (parseFloat(expense.value) * parseFloat(
                          (expense.exchangeRates[expense.currency].ask),
                        )).toFixed(2)
                      }
                    </td>
                    <td>{expense.currency}</td>
                    <td>
                      <section>
                        <button
                          type="submit"
                          data-testid="edit-btn"
                          onClick={ () => this.handleEditButton(expense.id) }
                        >
                          { editor ? 'Editanto' : 'Editar' }
                        </button>
                      </section>

                      <section>
                        <button
                          type="submit"
                          data-testid="delete-btn"
                          onClick={ () => this.handleDeleteButton(expense.id) }
                        >
                          Excluir
                        </button>
                      </section>
                    </td>
                  </tr>
                </tbody>)))
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
