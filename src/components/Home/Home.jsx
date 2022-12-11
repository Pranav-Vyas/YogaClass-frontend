import React from "react";
import { useState } from "react";
import Alert from "../Alert/Alert";
import "./Home.css";

function Home() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [batch, setbatch] = useState("");
  const [alertText, setalertText] = useState("");
  const [alertColor, setalertColor] = useState("");

  function validate() {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      age === "" ||
      batch === ""
    ) {
      setalertText("Every field is required");
      setalertColor("#F8D7DA");
      return false;
    }
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      setalertText("Please enter valid email");
      setalertColor("#F8D7DA");
      return false;
    }
    if (age < 18 || age > 65) {
      setalertText("Age must be between 18 and 65");
      setalertColor("#F8D7DA");
      return false;
    }
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone.match(phoneRegex)) {
      setalertText("Please enter valid phone number");
      setalertColor("#F8D7DA");
      return false;
    }
    setalertText("");
    setalertColor("");
    return true;
  }

  const proceed = async (e) => {
    if (!validate()) {
      return;
    }
    e.preventDefault();
    try {
      const res = await fetch("https://yoga-class-api.onrender.com/addUser", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          age: age,
          phone: phone,
          email: email,
          batch: batch,
        }),
      });
      await res.json();
      if (res.status > 200) {
        setalertText("Something went wrong");
        setalertColor("#F8D7DA");
      } else {
        setalertText("Payment Successful");
        setalertColor("#D4EDDA");
      }
    } catch (error) {
      console.log(error);
      setalertText("Something went wrong");
      setalertColor("#F8D7DA");
    }
  };

  return (
    <div className="home-wrapper">
      <div className="form-wrapper">
        <h1>Yoga Form</h1>
        <Alert message={alertText} theme={alertColor}/>
        <div className="form-container">
          <div className="name">
            <input
              className="firstName"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
              placeholder="First Name"
              type="text"
            />
            <input
              className="lastName"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div className="email-container">
            <input
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              className="email"
            />
            <input
              placeholder="Age"
              onChange={(e) => setage(e.target.value)}
              value={age}
              type="number"
              className="age"
              name="age"
            />
          </div>
          <div className="phone-container">
            <input
              placeholder="Phone Number"
              onChange={(e) => setphone(e.target.value)}
              value={phone}
              className="phone"
              type="text"
            />
          </div>
          <div className="batches">
            <h4 style={{ margin: "0 0 10px 0", color: "gray" }}>
              Select Batch
            </h4>
            <div className="batch">
              <input
                onChange={() => setbatch(0)}
                type="radio"
                id="b1"
                name="batch"
                value="0"
              />
              <label htmlFor="batch1">6 - 7 AM</label>
            </div>
            <div className="batch">
              <input
                onChange={() => setbatch(1)}
                type="radio"
                id="b2"
                name="batch"
                value="1"
              />
              <label htmlFor="batch2">7 - 8 AM</label>
            </div>
            <div className="batch">
              <input
                onChange={() => setbatch(2)}
                type="radio"
                id="b3"
                name="batch"
                value="2"
              />
              <label htmlFor="age1">8 - 9 AM</label>
            </div>
            <div className="batch">
              <input
                onChange={() => setbatch(3)}
                type="radio"
                id="b4"
                name="batch"
                value="3"
              />
              <label htmlFor="age1">5 - 6 PM</label>
            </div>
          </div>
          <div className="submit">
            <button onClick={proceed} className="payment">
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
