import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../UI/Modal/Modal.tsx';
import AddTransaction from '../../containers/AddTransaction/AddTransaction.tsx';

const Toolbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <nav className="navbar bg-dark">
        <div className="container py-2">
          <NavLink className="d-inline-flex gap-2 navbar-brand fw-bold fs-4 text-white" to="/">
            <i className="bi bi-wallet"></i>
            Finance Tracker
          </NavLink>
          <div className="ms-auto d-flex gap-4 align-items-center">
            <NavLink to="/categories"
                     className="text-white text-decoration-none pe-4 border-end">Categories</NavLink>
            <NavLink to="/" onClick={() => setShowModal(true)}
                     className="text-white text-decoration-none">Add</NavLink>
          </div>
        </div>
      </nav>

      <Modal show={showModal} closeModal={() => setShowModal(false)} defaultModalBtn>
        <AddTransaction/>
      </Modal>
    </>
  );
};

export default Toolbar;