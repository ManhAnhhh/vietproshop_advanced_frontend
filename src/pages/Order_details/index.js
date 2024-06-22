import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderCustomer } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const totalPrice = order.reduce((acc, cur)=> acc + cur.qty * cur.price , 0)
  useEffect(() => {
    getOrderCustomer(id)
      .then(({ data }) => {
        console.log(data.items)
        setOrder(data.items);
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <div>
        {/*	Order Details	*/}
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Số lượng
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {order.map((item, index) => {
              return (
                <div className="cart-item row">
                  <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    <img src={getImageProduct(item.image)} />
                    <h4>{item.name}</h4>
                  </div>
                  <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                    <p>{item.qty}</p>
                  </div>
                  <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                    <b>{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Order Details	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Về danh sách đơn hàng</b>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Về trang chủ</b>
              </a>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};

export default OrderDetails;
