const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");




const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "***************@gmail.com",
    pass: "********",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const contactname = req.body.contactname;
  const contactemail = req.body.contactemail;
  const contactnumber = req.body.contactnumber;
  const mail = {
    from: contactname,
    to: "***************@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${contactname}</p>
           <p>Email: ${contactemail}</p>
           <p>Message: ${contactnumber}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
