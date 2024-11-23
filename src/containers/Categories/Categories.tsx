import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteCategory, fetchCategories } from '../../store/thunks/categoriesThunk.ts';
import { selectAllCategories } from '../../store/slices/categoriesSlice.ts';
import Modal from '../../components/UI/Modal/Modal.tsx';
import AddCategory from '../AddCategory/AddCategory.tsx';
import CategoryCard from '../../components/CategoryCard/CategoryCard.tsx';
import { toast } from 'react-toastify';
import EditCategory from '../EditCategory/EditCategory.tsx';
import { ICategory } from '../../types';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const categories = useAppSelector(selectAllCategories);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAllCategories = useCallback(async () => {
    await dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchAllCategories();
  }, [fetchAllCategories]);

  const deleteOneCategory = async (id: string) => {
    if (confirm('Do you want to delete this category?')) {
      await dispatch(deleteCategory(id));
      toast.success('Category deleted!');
      navigate('/categories');
      void fetchAllCategories();
    } else {
      toast.info('Category deletion canceled.');
    }
  };

  const handleEditCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Categories</h4>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setShowModal(true)}
        >
          Add category
        </button>
        <Modal show={showModal} closeModal={() => setShowModal(false)} defaultModalBtn>
          <AddCategory/>
        </Modal>
      </div>
      <div className="mt-5">
        {categories.map((category: ICategory) => (
          <CategoryCard
            key={category.id}
            category={category}
            deleteCategory={() => deleteOneCategory(category.id)}
            editCategory={() => handleEditCategory(category.id)}
          />
        ))}
        {showEditModal && selectedCategoryId && (
          <Modal show={showEditModal} closeModal={() => setShowEditModal(false)} defaultModalBtn>
            <EditCategory catId={selectedCategoryId}/>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Categories;