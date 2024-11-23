import { ICategory } from '../../types';
import React, { useState } from 'react';
import { globalConstants } from '../../globalConstants/globalConstants.ts';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';
import { toast } from 'react-toastify';

interface Props {
  formAction: (category: ICategory) => void;
  existingCategory?: ICategory;
  isEditing?: boolean;
  isLoading?: boolean;
}

const initialState = {
  id: '',
  name: '',
  type: '',
};

const CategoryForm: React.FC<Props> = ({
  formAction,
  existingCategory = initialState,
  isEditing = false,
  isLoading = false
}) => {

  const [form, setForm] = useState({...existingCategory});

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

    if (!form.name.trim().length || !form.type.trim().length) {
      toast.warning('Fill out all fields!');
    } else formAction({...form});

    if (!isEditing) {
      setForm({...initialState});
    }
  };

  return (
    <>
      <h3 className="my-2 text-center">
        {isEditing ? 'Edit category' : 'Add category'}
      </h3>

      <form onSubmit={onSubmit} className="p-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category name"
            onChange={onChange}
            name="name"
            value={form.name}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="type"
            id="selectCategory"
            onChange={onChange}
            value={form.type}
          >
            <option value="" disabled>Select category type</option>
            {globalConstants.map((type) => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
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

export default CategoryForm;