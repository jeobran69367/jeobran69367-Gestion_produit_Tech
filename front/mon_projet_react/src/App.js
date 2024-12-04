// src/App.js
import React from 'react';
import Produits from './components/Produits';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Produits />
      </div>
    </Provider>
  );
}

export default App;
