import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../../services/Api";
const Register = () => {
  const [inputCustomer, setInputCustomer] = useState({});
  const [errorRegister, setErrorRegister] = useState("");
  const navigate = useNavigate();
  const changeInputsCustomer = (e) => {
    const { name, value } = e.target;
    return setInputCustomer({ ...inputCustomer, [name]: value });
  };
  const clickRegister = (e) => {
    e.preventDefault();
    registerCustomer(inputCustomer)
      .then(() => {
        setErrorRegister("");
        return navigate("/Login");
      })
      .catch(({ response }) => {
        if (response.data === "Email exists!")
          return setErrorRegister("Emai đã tồn tại!");
        if (response.data === "Phone exists!")
          return setErrorRegister("SĐT đã tồn tại!");
      });
  };
  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        {errorRegister && (
          <div className="alert alert-danger text-center">{errorRegister}</div>
        )}

        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              {/* <label className="text-primary">Họ và tên</label> */}
              <input
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                value={inputCustomer.fullName || ""}
                onChange={changeInputsCustomer}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                required
                value={inputCustomer.password || ""}
                onChange={changeInputsCustomer}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputCustomer.email || ""}
                onChange={changeInputsCustomer}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                value={inputCustomer.phone || ""}
                onChange={changeInputsCustomer}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                value={inputCustomer.address || ""}
                onChange={changeInputsCustomer}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#" onClick={clickRegister}>
              <b>Đăng ký ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
};

export default Register;
