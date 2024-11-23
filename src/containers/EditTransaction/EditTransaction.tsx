import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsEditing, selectIsFetching, selectOneTransaction } from '../../store/slices/transactionSlice.ts';
import { ITransaction } from '../../types';
import { toast } from 'react-toastify';
import { editTransaction, fetchTransactions, getTransactionById } from '../../store/thunks/transactionThunk.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';

interface Props {
  trId: string | null;
}

const EditTransaction: React.FC<Props> = ({trId}) => {
  const navigate = useNavigate();
  const oneTransaction = useAppSelector(selectOneTransaction);
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectIsEditing);
  const isFetching = useAppSelector(selectIsFetching);

  const getTransaction: () => Promise<void> = useCallback(async () => {
    if (trId) await dispatch(getTransactionById(trId));
  }, [dispatch, trId]);

  useEffect(() => {
    void getTransaction();
  }, [getTransaction]);

  const edit = async (transaction: ITransaction) => {
    if (trId) await dispatch(editTransaction({id: trId, transaction}));
    await dispatch(fetchTransactions());
    toast.success('Transaction edited successfully!');
  };

  return (
    <>
      {isFetching ? <Loader/> :
        <>
          {oneTransaction ?
            <TransactionForm
              formAction={edit}
              existingTransaction={oneTransaction}
              isEditing
              isLoading={isEditing}
            /> : navigate('/')}
        </>
      }
    </>
  );
};

export default EditTransaction;