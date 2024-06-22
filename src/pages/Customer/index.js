import { useState } from "react";
import { useSelector } from "react-redux";
import { updateCustomer } from "../../services/Api";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../../redux-setup/reducers/auth";
import { Link } from "react-router-dom";

const Customer = () => {
  const customer = useSelector(({ Auth }) => Auth.login.currentCustomer);
  const [inputsCustomer, setInputsCustomer] = useState(customer);
  const [alertCls, setAlertCls] = useState("");
  const [alertUpdate, setAlertUpdate] = useState("");

  const changeInputsCustomer = (e) => {
    const { name, value } = e.target;
    setInputsCustomer({ ...inputsCustomer, [name]: value });
  };
  const dispatch = useDispatch();
  const clickUpdate = (e) => {
    e.preventDefault();
    updateCustomer(inputsCustomer)
      .then(({ data }) => {
        dispatch(updateSuccess(inputsCustomer));
        setAlertCls("success");
        setAlertUpdate("Cập nhật thành công");
      })
      .catch(({ response }) => {
        if (response.data === "Phone exists!") {
          setAlertCls("danger");
          setAlertUpdate("Số điện thoại đã tồn tại");
        }
      });
  };
  return (
    <>
      <div id="customer">
        {alertUpdate && (
          <div className={`alert alert-${alertCls} text-center`}>
            {alertUpdate}
          </div>
        )}
        <h3 className="text-center">Thông tin chi tiết</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                value={inputsCustomer.fullName || ""}
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                value={"123456"}
                disabled
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={inputsCustomer.email || ""}
                required
                disabled
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={inputsCustomer.phone || ""}
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                value={inputsCustomer.address || ""}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link onClick={clickUpdate} to="#">
              <b>Cập nhật ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="#">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
