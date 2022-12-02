import {  useState } from "react";
import { createDataByPath } from "../services/data.service";
import validator from "validator";
import "../assist/style.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const dataForCreate = () => {
    return {
      phone: phone,
    };
  };
  const checkValidation = () => {
    const phoneValidate = validator.isMobilePhone(phone);
    return phoneValidate;
  };
  async function createNewProducts() {
    if (checkValidation()) {
      const data = dataForCreate();
      const path = "login";
      const res = await createDataByPath(path, "", data);
      // console.log("Check res", res);
      if (res && res.status === 200) {
        history.push(`LoginOtp/${phone}`);
      }
    } else {
      Swal.fire("Phone number must be include 10-11 digits", "", "error");
    }
  }

  return (
    <div>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
          <header className="head-form">
              <h2>Login OTP</h2>
            </header>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                createNewProducts();
              }}
            >
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
