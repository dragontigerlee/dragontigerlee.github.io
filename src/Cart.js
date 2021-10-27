import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <>

        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
            </tr>
            </thead>
            <tbody>
            {
                props.state.map((v,i)=>{
                    return (
                        <StockDiv v={v} key={i} p={props}/>
                    )
                })
            }
            </tbody>
        </Table>

        {
            (props.alert === true )
            ?  <div className="my-alert2">
                    <p>지금 구매하시면 신규할인 20%</p>
                    <button onClick={ ()=>{ props.dispatch( {type:"close"} ) } } >닫기</button>
                </div>
            : null

        }
       

        </>
    )
}

function StockDiv(props) {
    return (
        <tr>
            <td>{props.v.id}</td>
            <td>{props.v.name}</td>
            <td>{props.v.quan}</td>
            <td>
                <button onClick={ ()=>{ props.p.dispatch( { type:'plus', id:props.v.id } ) } }> + </button>
                <button onClick={ ()=>{ props.p.dispatch( { type:'minus', id:props.v.id } ) } }> - </button>
            </td>
        </tr>
    )
}


function tempfun(state){ //state <-store에 있었던 모든 데이터
    return {
        state : state.reducer,
        alert : state.reducer2
    }
}

export default connect(tempfun)(Cart)

// export default Cart;