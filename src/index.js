import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './Components/Store/AuthContext';
import store from './Components/Store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
  <BrowserRouter basename='/ExpenseTracker'>
    <App />
  </BrowserRouter>
  </Provider>
  </AuthContextProvider>
);
