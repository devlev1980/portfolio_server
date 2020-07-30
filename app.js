const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

// view engine setup
app.engine("hbs", exphbs());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(__dirname + "/views");
  res.json({ name: "Alex" });
});
app.post("/send", async (req, res) => {
  console.log(req.body);
  const output = `
        <p style="font-size: 20px">You have a new contact request</p>
        <h3 style="font-size: 18px">Contact details:</h3>
        <ul style="list-style: none;font-size: 18px" >
          <li>Name: ${req.body.name}</li>
          <li>Company: ${req.body.company}</li>
          <li>Email: ${req.body.email}</li>
          <li>Subject: ${req.body.subject}</li>
       </ul>
       <h3 style="font-size: 18px">Message: </h3>
       <p style="font-size: 17px">${req.body.message}</p>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sound1980@gmail.com",
      pass: "Sound2207kp302s$",
    },
  });

  let mailOptions = {
    from: '"Nodemailer contact" <sound1980@gmail.com>', // sender address
    to: "string1980@gmail.com", // list of receivers
    subject: "Nodemailer contact request ✔", // Subject line
    text: "", // plain text body
    html: output, // html body
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error", error);
    } else {
      res.send("Thanks.Email was sent successfully!Will be in touch");

      console.log("Email sent:" + info.response);
    }
  });
});
app.listen(port, () => console.log("Server running on port", port));
