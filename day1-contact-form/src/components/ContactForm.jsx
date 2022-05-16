import React, { useState } from "react";
// import axios from "axios";
export const ContactForm = () => {
  const [contactname, setcontactname] = useState("");
  const [contactemail, setcontactemail] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [status, setstatus] = useState("Submit");

  const handleSubmit = async (e) => {
    // step1:-check data first
    e.preventDefault();
    console.log(contactname, contactemail);
    setstatus("Sending.......");
    //step2:- create payload structure
    const payload = {
      name: contactname,
      email: contactemail,
      mobile: contactnumber,
    };
    console.log("payload", payload);

    let response = await fetch(
      "http://localhost:8080/ContactForm",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      }
    );

    // console.log("response", response);
    setstatus("Submit.......");
    // console.log("data", data);
    let result = await response.json();
    console.log("result", result);
    // console.log("result", response);
    alert(result.name);
  };

  return (
    <>
      <div className="contact-form-div">
        <form onSubmit={handleSubmit} className="contact-innerdiv">
          <div>
            <input
              type="text"
              value={contactname}
              name="name"
              //   onChange={handleChange}
              onChange={(e) => setcontactname(e.target.value)}
              className="contactname"
              placeholder="Enter Name"
            />
          </div>
          <br />
          <div>
            <input
              type="email"
              name="email"
              //   onChange={handleChange}
              value={contactemail}
              onChange={(e) => setcontactemail(e.target.value)}
              className="contactemail"
              placeholder="Enter Email"
            />
          </div>
          <br />
          <div>
            <input
              type="number"
              name="mobileno."
              value={contactnumber}
              onChange={(e) => setcontactnumber(e.target.value)}
              className="contactemail"
              placeholder="EnterMobileno."
            />
          </div>
          <br />
          <br />
          <div>
            <button type="submit" className="btn btn-primary">
              {status}
            </button>
            {status}
          </div>
        </form>
      </div>
    </>
  );
};
