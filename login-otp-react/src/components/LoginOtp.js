import {  useState } from "react";
import { createDataByPath } from "../services/data.service";
import Swal from "sweetalert2";
import "../assist/style.css";

import { useParams } from "react-router-dom";

const LoginOtp = () => {
  const [otp, setOtp] = useState("");
  const dataForCreate = () => {
    return {
      phone: phone,
      otp: otp,
    };
  };
  const [phonenumber, setPhoneNumber] = useState({
    phone: "",
  });
  let { phone } = useParams();
  const checkValidation = () => {
    return true;
  };
  async function createNewProducts() {
    if (checkValidation()) {
      const data = dataForCreate();
      const path = "otp";
      const res = await createDataByPath(path, "", data);
      // console.log("Check res", res);
      if (res && res.status === 200) {
        Swal.fire("Create Success", "", "success");
      } else {
        Swal.fire("Create Error", "", "error");
      }
    }
  }
  const handleUpdate = (e) => {
    setPhoneNumber({ ...phonenumber, [e.target.phone]: e.target.value });
  };
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
              placeholder="Phone"
              value={phone}
              onChange={(e) => handleUpdate(e)}
            />
            <br />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
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
export default LoginOtp;
