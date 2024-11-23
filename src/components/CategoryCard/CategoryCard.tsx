import { ICategory } from '../../types';
import React from 'react';

interface Props {
  category: ICategory;
  deleteCategory: React.MouseEventHandler;
  editCategory: React.MouseEventHandler;
}

const CategoryCard: React.FC<Props> = ({category, deleteCategory, editCategory}) => {
  return (
    <div className="card mb-3 p-4">
      <div className=" d-flex justify-content-between gap-3 mb-3 align-items-center">
        <h5 className="m-0 p-0">{category.name}</h5>
        <div className="d-flex justify-content-end align-items-center gap-3">
          <p className={`${category.type === 'Income' ? 'text-success' : 'text-danger'} m-0 p-0`}>
            {category.type}
          </p>
          <button type="button" className="btn btn-dark" onClick={editCategory}>
            <i className="bi bi-pen"></i>
          </button>
          <button type="button" className="btn btn-dark" onClick={deleteCategory}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;