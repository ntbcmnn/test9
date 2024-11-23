import CategoryForm from '../../components/CategoryForm/CategoryForm .tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addCategory, fetchCategories } from '../../store/thunks/categoriesThunk.ts';
import { ICategory } from '../../types';
import { toast } from 'react-toastify';
import { selectCreating } from '../../store/slices/categoriesSlice.ts';

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreating);

  const createCategory = async (category: ICategory) => {
    await dispatch(addCategory(category));
    navigate('/categories');
    await dispatch(fetchCategories());
    toast.success('Category created!');
  };

  return (
    <div>
      <CategoryForm formAction={createCategory} isLoading={isCreating}/>
    </div>
  );
};

export default AddCategory;