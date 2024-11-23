import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectEditing, selectFetching, selectOneCategory } from '../../store/slices/categoriesSlice.ts';
import React, { useCallback, useEffect } from 'react';
import { editCategory, fetchCategories, getCategoryById } from '../../store/thunks/categoriesThunk.ts';
import { ICategory } from '../../types';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader.tsx';
import CategoryForm from '../../components/CategoryForm/CategoryForm .tsx';

interface Props {
  catId: string | null;
}

const EditCategory: React.FC<Props> = ({ catId }) => {
  const navigate = useNavigate();
  const category = useAppSelector(selectOneCategory);
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectEditing);
  const isFetching = useAppSelector(selectFetching);

  const getCategory: () => Promise<void> = useCallback(async () => {
    if (catId) {
      await dispatch(getCategoryById(catId));
    }
  }, [dispatch, catId]);

  useEffect(() => {
    if (!catId) {
      navigate('/categories');
      return;
    }
    void getCategory();
  }, [getCategory, navigate, catId]);

  const edit = async (category: ICategory) => {
    if (catId) await dispatch(editCategory({ id: catId, category }));
    await dispatch(fetchCategories());
    toast.success('Category edited successfully!');
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {category ? (
            <CategoryForm
              formAction={edit}
              existingCategory={category}
              isEditing
              isLoading={isEditing}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default EditCategory;
