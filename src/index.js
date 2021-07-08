import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';


let alert = true;

function reducer2(state=alert, action) {
  if(action.type == "close"){
    // let newAlert = state;
    // newAlert=false;
    alert=false;
    return alert;
    
  }else{
    return alert;
  }

}


let defaultState = [
  { id : 0, name : 'White and Black', quan : 1}
];

function reducer(state = defaultState , action) {
  if(action.type === 'goodsAdd'){
    let copy = [...state];
    let exist = copy.find((v)=>{
      return v.id === action.payload.id;
    });
    if(exist) {
      copy[action.payload.id].quan++;
    }else{
      copy.push(action.payload);
    }
    return copy;

  }else if(action.type === 'plus' ){
    let copy = [...state];
    let result  = copy.find((v)=>{
      return v.id === action.id;
    });
    result.quan++;

    return copy;

  }else if(action.type === 'minus'){

    let copy = [...state];
    let result = copy.find( (v)=>{ 
      return v.id === action.id;
    });
    result.quan = (result.quan > 0) ? --result.quan : 0
    return copy;

  }else {
    return state;

  }
}

let store = createStore(combineReducers({reducer,reducer2}));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
