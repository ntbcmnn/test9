import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect, useState } from 'react';
import { selectAllTransactions } from '../../store/slices/transactionSlice.ts';
import { deleteTransaction, fetchTransactions } from '../../store/thunks/transactionThunk.ts';
import { toast } from 'react-toastify';
import TransactionCard from '../../components/TransactionCard/TransactionCard.tsx';
import Modal from '../../components/UI/Modal/Modal.tsx';
import EditTransaction from '../EditTransaction/EditTransaction.tsx';
import { selectAllCategories } from '../../store/slices/categoriesSlice.ts';
import { fetchCategories } from '../../store/thunks/categoriesThunk.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectAllTransactions);
  const categories = useAppSelector(selectAllCategories);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTranId, setSelectedTranId] = useState<string | null>(null);

  const fetchAllTransactions = useCallback(async () => {
    await dispatch(fetchTransactions());
  }, [dispatch]);

  const fetchAllCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchAllTransactions();
    void fetchAllCategories();
  }, [fetchAllTransactions, fetchAllCategories]);

  const removeTransaction = async (id: string) => {
    if (confirm('Do you want to delete this transaction?')) {
      await dispatch(deleteTransaction(id));
      toast.success('Transaction deleted!');
      void fetchAllTransactions();
    } else {
      toast.info('Transaction deletion cancelled.');
    }
  };

  const handleEditTransaction = (trId: string) => {
    setSelectedTranId(trId);
    setShowEditModal(true);
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown Category';
  };

  return (
    <>
      {!categories.length || !transactions.length ? (
        <Loader/>
      ) : (
        <>
          <h4>Transactions</h4>

          <div className="mt-5">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={{
                  ...transaction,
                  category: getCategoryName(transaction.category),
                }}
                deleteTransaction={() => removeTransaction(transaction.id)}
                editTransaction={() => handleEditTransaction(transaction.id)}
              />
            ))}
            {showEditModal && selectedTranId && (
              <Modal show={showEditModal} closeModal={() => setShowEditModal(false)} defaultModalBtn>
                <EditTransaction trId={selectedTranId}/>
              </Modal>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Transactions;