import './App.css';
import Login from './component/login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Ledger from './component/ledger/Ledger';
import NewPassword from './component/login/NewPassword';
import Trading from './component/Trading/Trading';
import Transaction from './component/Transaction/Transaction';
import 'devextreme/dist/css/dx.light.css';
import Holding from './component/holding/Holding';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path = "/" element={<Login />} />
      <Route exact path='/new-password' element={<NewPassword />} />
      <Route exact path = "/tradeweb/ledger" element={<Ledger />} />
      <Route exact path = "/tradeweb/trading" element={<Trading />} />
      <Route exact path = "/tradeweb/transaction" element={<Transaction />} />
      <Route exact path = "/tradeweb/holding" element = {<Holding />} />
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
