import React, { useCallback, useEffect, useState } from 'react';
import { ICategory, ITransaction } from '../../types';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllCategories } from '../../store/slices/categoriesSlice.ts';
import { toast } from 'react-toastify';
import { globalConstants } from '../../globalConstants/globalConstants.ts';
import { fetchCategories } from '../../store/thunks/categoriesThunk.ts';

interface Props {
  formAction: (transaction: ITransaction) => void;
  existingTransaction?: ITransaction;
  isEditing?: boolean;
  isLoading?: boolean;
}

const initialState = {
  id: '',
  type: '',
  category: '',
  amount: 0,
  date: '',
};

const TransactionForm: React.FC<Props> = ({
  formAction,
  existingTransaction = initialState,
  isLoading,
  isEditing
}) => {

  const categories = useAppSelector(selectAllCategories);
  const [form, setForm] = useState({...existingTransaction});
  const dispatch = useAppDispatch();

  const fetchAllCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchAllCategories;
  }, [fetchAllCategories]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm((prevState) => {
      const {name, value} = e.target;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.type.trim() || !form.amount || !form.category.trim()) {
      toast.warning('Fill out all fields!');
      return;
    }

    formAction({...form});
    if (!isEditing) {
      setForm({...initialState});
    }
  };

  return (
    <>
      <h3 className="my-2 text-center">
        {isEditing ? 'Edit transaction' : 'Add transaction'}
      </h3>
      <form onSubmit={onSubmit} className="p-4">
        <div className="mb-3">
          <select name="type" value={form.type} onChange={onChange} className="form-select">
            <option value="">Select type of transaction</option>
            {globalConstants.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <select name="category" value={form.category} onChange={onChange} className="form-select">
            <option value="">Select category</option>
            {categories.map((category: ICategory) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="amount"
            className="form-control"
            value={form.amount}
            onChange={onChange}
            placeholder="Amount"
            min={1}
            required
          />
        </div>

        <div className="my-4 d-flex justify-content-center">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-dark d-flex align-items-center justify-content-center"
          >
          <span className="me-2">
            {isEditing ? 'Edit' : 'Add'}
          </span>
            {isLoading ? <ButtonSpinner/> : null}
          </button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;