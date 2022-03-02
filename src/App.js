import './App.css';
import Login from './component/login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Ledger from './component/ledger/Ledger';
import NewPassword from './component/login/NewPassword';
import Trading from './component/Trading/Trading';
import Transaction from './component/Transaction/Transaction';
import 'devextreme/dist/css/dx.light.css';
const App = () => {
  return (
    <>
   <div>
   <BrowserRouter>
    <Routes>
      <Route exact path = "/" element={<Login />} />
      <Route  path='/new-password' element={<NewPassword />} />
      <Route  path = "/tradeweb/lodger" element={<Ledger />} />
      <Route  path = "/tradeweb/trading" element={<Trading />} />
      <Route  path = "/tradeweb/transaction" element={<Transaction />} />
      </Routes>
      </BrowserRouter>
   </div>
      </>
  );
}

export default App;
