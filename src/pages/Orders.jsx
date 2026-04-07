import React, { useEffect, useState } from 'react';
import './Orders.css';
import { useStateValue } from '../StateProvider.jsx';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import Order from '../components/Order.jsx';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const q = query(ordersRef, orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
