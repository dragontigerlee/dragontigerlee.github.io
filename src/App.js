/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Navbar,Container,Nav,NavDropdown,Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js';

import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

export let stockContext = React.createContext();


function App(props) {

  let [shoes, chgShoes] =  useState(Data);
  let [stock, chgStock] = useState([10,11,12,4,5,9]);
  let [showBtn, chgShowBtn] = useState(1);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">20% Season OFF</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home </Nav.Link>
              <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>

      {/* 메인페이지 */}
      <Route exact path="/">
        <div className="background">
          <h1> DragonTiger 쇼핑몰 </h1>
          <p>
          안녕하세요 DragonTiger 쇼핑몰 입니다. React 연습용 쇼핑몰 입니다. 감사합니다.
          </p>
          {/* <p>
            <Button variant="primary">더 보기</Button>
          </p> */}
        </div>
        <div className="container">

          <stockContext.Provider value={stock}>

          <div className="row">
              {
                shoes.map((v,i)=>{
                  return(
                      <Product shoes={v} i={i} key={i}></Product>
                  )
                })
              }
          </div>

          </stockContext.Provider>
          
          {
            (showBtn < 2) ? 
            <button className="btn btn-primary" onClick={ ()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                // let newShoes = [...shoes];
                // newShoes.push.apply(newShoes,result.data);
                // chgShoes(newShoes);
                chgShoes([...shoes, ...result.data]);
                chgShowBtn(++showBtn);
              })
              .catch(()=>{
                console.log('failed');
              })
            } }>더보기</button>
            : null
          }
        </div>
      </Route>

      {/* 디테일  */}
      <Route path="/detail/:id">
        <stockContext.Provider value={stock}>
          <Detail shoes={shoes} stock={stock} chgStock={chgStock} />
        </stockContext.Provider>
      </Route>
      {/* <Route path="/someting" component={변수} ></Route> */}

      <Route path="/cart">
          <Cart />
      </Route>

      </Switch>

    </div>
  );
}


function Product(props ) {
  let history = useHistory();
  return (
    <>
      <div className="col-md-4" onClick={ ()=>{ history.push("/detail/"+ props.shoes.id)} }>
        <img src={ "https://codingapple1.github.io/shop/shoes"+ ( props.i+1) +".jpg" } width="100%"/>
        <h4> { props.shoes.title } </h4>
        <p> {  props.shoes.content } & {  props.shoes.price }</p>
        <Test i={ props.i}></Test>
      </div>
    </>
  )
}

function Test({i}) {

  let stock = useContext(stockContext);

  return <p>재고 : {stock[i]} </p>
}

function connApp(v){
  return (
    { reduxVal : v.reducer }
  )
}

export default connect(connApp)(App);
