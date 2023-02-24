import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Store } from '../Store';
import { getError } from '../utils/utils';
import Loading from '../components/loading/Loading';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:5000/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div className='pt-5'>
      <Helmet>
        <title>Order History</title>
      </Helmet>

    <div className=" justify-content-around container">
    <h1 className='text-light'>Order History</h1>
      <h5 className='text-light'>{orders && orders.length} order </h5>
    </div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : orders && orders.length === 0 ? 
      <div className='text-center'>
<img src="https://cdn-icons-png.flaticon.com/128/960/960616.png" alt='no_order' width={"100px"}  />
<br></br>
<p className='text-light'>No orders yet</p>

      </div> :  (
        <div className='container'>
        <table className=" table table-responsive text-info">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              {/* <th>ACTIONS</th> */}
            </tr>
          </thead>
          <tbody className='text-light'>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(5,10)}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                {/* <td>
                  <button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}