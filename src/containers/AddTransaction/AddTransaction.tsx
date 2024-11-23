import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsCreating } from '../../store/slices/transactionSlice.ts';
import { ITransaction } from '../../types';
import { toast } from 'react-toastify';
import { addTransaction, fetchTransactions } from '../../store/thunks/transactionThunk.ts';
import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';


const AddTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);

  const createTransaction = async (transaction: ITransaction) => {
    await dispatch(addTransaction(transaction));
    navigate('/');
    await dispatch(fetchTransactions());
    toast.success('Transaction added!');
  };

  return (
    <div>
      <TransactionForm formAction={createTransaction} isLoading={isCreating}/>
    </div>
  );
};

export default AddTransaction;