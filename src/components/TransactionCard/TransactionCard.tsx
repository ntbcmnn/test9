import React from 'react';
import { ITransaction } from '../../types';

interface Props {
  transaction: ITransaction;
  deleteTransaction: React.MouseEventHandler;
  editTransaction: React.MouseEventHandler;
}

const TransactionCard: React.FC<Props> = ({transaction, deleteTransaction, editTransaction}) => {
  return (
    <div className="card mb-3 p-4">
      <div className="mb-3">
        <div className="d-flex justify-content-start gap-2 align-items-center mb-4">
          <h5 className="m-0 p-0">{transaction.category}</h5>
          <p className={`${transaction.type === 'income' ? 'text-success' : 'text-danger'} m-0 p-0 fw-bold`}>
            {transaction.type}
          </p>
        </div>
        <p className="fs-4 fw-bold">{transaction.amount} KGS</p>
        <p className="text-muted">{new Date(transaction.date).toLocaleString()}</p>
        <div className="d-flex justify-content-start align-items-center gap-3">
          <button type="button" className="btn btn-dark" onClick={editTransaction}>
            <i className="bi bi-pen"></i>
          </button>
          <button type="button" className="btn btn-dark" onClick={deleteTransaction}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;