import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import './Detail.scss';
import { stockContext } from './App.js';

import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

let Box = styled.div`
    padding : 20px;
`;
let Title = styled.h4`
    font-size:25px;
    color: ${props => props.color};
`;


// class Detail2 extends React.Component {
//     componentDidMount(){

//     }

//     componentWillUnmount(){

//     }
// }

function Detail(p) {

    let stock = useContext(stockContext);

    let [show,chgShow] =  useState(true);
    let [inputData,chgInputData] = useState('');

    let [tab, chgTab] = useState(0);
    let [sw ,chgSw] =useState(false);

    useEffect(()=>{
        let timer = setTimeout(() => {
            chgShow(false);
        }, 2000);

        return ()=>{ clearTimeout(timer) }
    }, [] );
    
    let { id } = useParams();
    let history = useHistory();
    let detail = p.shoes.find(function(v){
        return v.id == id;
    })
    return (
            <div className="container">
            <Box>
                {/* <Title color={'blue'}>상세페이지</Title> */}
                <Title className="red">상세페이지</Title>
            </Box>
            
            {/* { inputData } */}
            {/* <input onChange={ (e)=>{ chgInputData(e.target.value)} }/> */}

            {
                (show === true) 
                ? <Alert/>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                <img src={ 'https://codingapple1.github.io/shop/shoes'+(detail.id+1)+'.jpg' } width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5"> {detail.title} </h4>
                <p>{detail.content}</p>
                <p>{detail.price}</p>

                <Info stock={stock}></Info>
        
                <button className="btn btn-danger" onClick={ ()=>{ 
                    p.dispatch( {type:'goodsAdd', payload : {id:detail.id , name:detail.title, quan:1} } );
                    history.push('/cart');
                    
                 }}>주문하기</button> &nbsp;
                <button className="btn btn-danger" onClick={ ()=>{ history.goBack(); } }>뒤로가기</button> 
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={ ()=>{ chgTab(0); chgSw(false) } }>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={ ()=>{ chgTab(1); chgSw(false) } }>Option 2</Nav.Link>
                </Nav.Item>
            </Nav>

            <CSSTransition in={sw} classNames="wow" timeout={500}>
                <TabContent tab={tab} chgSw={chgSw}/>
            </CSSTransition>

            </div> 
    )
}

function TabContent(props) {

    useEffect(()=>{
        props.chgSw(true);
    });

    if(props.tab === 0) {
        return <div>0번째 내용입니다.</div>
    }else if(props.tab === 1) {
        return <div>1번째 내용입니다.</div>
    }else if(props.tab === 2){
        return <div>2번째 내용입니다.</div>
    }
    
}

function Info(props) {
    return (
        <p>
            재고 : {props.stock[0]}
        </p>
    )
}

function Alert() {
    return (
    <div className="my-alert2">
        <p>재고가 얼마 남지 않았습니다.</p>
    </div>  
    )
}


function connDetail(state){
    return {
        state : state.reducer,
        alert : state.reducer2
    }
}

export default connect(connDetail)(Detail);
// export default Detail;