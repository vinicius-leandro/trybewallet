import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
                    <td>9</td>
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
});

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
