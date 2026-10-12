'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: string;
  createdAt: string;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postcode: string;
  };
}

export default function AccountPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/orders/my-orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <main className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Account</h1>
          <p className={styles.subtitle}>
            Welcome back, {user.firstName}!
          </p>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>

      <div className={styles.grid}>
        {/* Profile Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Profile Information</h2>
          <div className={styles.profileInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user.email}</span>
            </div>
          </div>
          <Link href="/account/edit" className={styles.editLink}>
            Edit Profile
          </Link>
        </div>

        {/* Quick Stats */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Account Stats</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{orders.length}</div>
              <div className={styles.statLabel}>Total Orders</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>
                £{orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2)}
              </div>
              <div className={styles.statLabel}>Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className={styles.ordersSection}>
        <h2 className={styles.ordersTitle}>Order History</h2>

        {ordersLoading ? (
          <div className={styles.loading}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyOrders}>
            <p>You haven't placed any orders yet.</p>
            <Link href="/" className={styles.shopButton}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <p className={styles.orderNumber}>Order #{order.orderNumber}</p>
                    <p className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('en-UK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className={styles.orderTotal}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span className={styles.totalAmount}>£{order.total}</span>
                  </div>
                  <span className={styles.status} data-status={order.status}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className={styles.orderItems}>
                  {order.items.map((item, idx) => (
                    <div key={idx} className={styles.orderItem}>
                      <span className={styles.itemName}>
                        {item.productName} ({item.brand})
                      </span>
                      <span className={styles.itemQty}>x{item.quantity}</span>
                      <span className={styles.itemPrice}>
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.shippingInfo}>
                    <p className={styles.shippingLabel}>Shipping To:</p>
                    <p className={styles.shippingAddress}>
                      {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                      {order.shippingAddress.postcode}
                    </p>
                  </div>
                  <Link
                    href={`/account/orders/${order.orderNumber}`}
                    className={styles.detailsLink}
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
