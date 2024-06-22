import { useEffect, useState } from "react";
import { getOrdersCustomer, canceledOrderCustomer } from "../../services/Api";
import { Link, useParams } from "react-router-dom";

// import alert
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

const Order = () => {
  const [sttOrder, setSttOrder] = useState("");
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrdersCustomer(id)
      .then(({ data }) => {
        setOrders(data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sttOrder]);

  const clickCanceled = (orderId) => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Do you want to cancel this order ?");
    if (isConfirm) {
      canceledOrderCustomer(orderId)
        .then(({data}) => {
          console.log(orderId);
          setSttOrder(orderId);
          console.log(data)
        })
        .catch((error) => { console.log(error);});
    }
    return false;
  }

  return (
    <>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-6 col-md-6 col-sm-12">
            Đơn hàng của bạn
          </div>
          <div className="cart-nav-item col-lg-6 col-md-6 col-sm-12">
            Tổng tiền
          </div>
        </div>
        <form method="post">
          {orders.map((order, index) => {
            return (
              <div className="cart-item row">
                <div className="cart-thumb col-lg-6 col-md-6 col-sm-12">
                  <h4>
                    Đơn hàng đã mua vào ngày:{" "}
                    <span className="text-secondary">
                      06-05-2024 hồi 12:30:59
                    </span>
                  </h4>
                  <p>Mã Đơn (MĐ): 
                    {
                      order._id
                    }
                  </p>
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{order.items.reduce((acc, cur)=> acc + cur.price * cur.qty,0).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
                </div>
                <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                  <Link to={`/OrderDetails-${order._id}`} className="btn btn-outline-dark mb-1">
                    Chi tiết đơn hàng
                  </Link>
                  {order.status === 1 ? (
                    <button type="button" className="btn btn-success mb-1">
                      Đơn đã giao
                    </button>
                  ) : null}
                  {order.status === 0 ? (
                    <button type="button" className="btn btn-danger mb-1">
                      Đơn đã hủy
                    </button>
                  ) : null}
                  {order.status === 2 ? (
                    <>
                      <button
                        onClick={() => clickCanceled(order._id)}
                        type="button"
                        className="btn btn-outline-danger mb-1"
                      >
                        Huỷ đơn
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning mb-1"
                      >
                        Đơn đang giao
                      </button>
                    </>
                  ) : null}
                  
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <button
                id="update-cart"
                className="btn btn-success"
                type="submit"
                name="sbm"
              >
                Quay về trang chủ
              </button>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              <ul className="pagination mt-4">
                <li className="page-item disabled">
                  <span className="page-link">Trang trước</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Trang sau
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
    </>
  );
};

export default Order;
