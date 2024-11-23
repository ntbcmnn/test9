import './App.css';
import Toolbar from './components/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from './containers/Categories/Categories.tsx';
import Transactions from './containers/Transactions/Transactions.tsx';

const App = () => {
  return (
    <>
      <Toolbar/>
      <div className="container m-5">
        <Routes>
          <Route path="/" element={<Transactions/>}/>
          <Route path="/home" element={<Transactions/>}/>
          <Route path="/categories" element={<Categories/>}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
