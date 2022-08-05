import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import WalletFormEdit from '../components/WalletFormEdit';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        {
          editor ? <WalletFormEdit /> : <WalletForm />
        }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  editor: store.wallet.editor,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
