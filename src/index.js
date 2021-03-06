import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import { store } from "./redux/redux-store";
import { Provider } from 'react-redux';
import { AppTimeDeterminationContainer } from "./components/App";
import './index.css';

// import {Provider} from './components/storeContext';

// console.log(Provider)

let reRender = (store) => {
  // console.log(store.getState())

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store} >
          <AppTimeDeterminationContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>, document.getElementById('root')
  )
};

reRender(store);
