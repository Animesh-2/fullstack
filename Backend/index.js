const express = require("express");
const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { usermodel } = require("./Models/userModel");
const jwt = require("jsonwebtoken");
const { noticeRouter } = require("./routes/noticeRoutes");

const app = express();

app.use(express.json());
app.use("/notice", noticeRouter)

// -----------------------[normal home endpoint]------------------------------->
app.get("/", (req, res) => {
  res.send("you are at home page");
});
// ---------------------------------------------------------------------->
// ---------------------[signup endpoint]------------------------------------>
app.post("/signup", async (req, res) => {
  const { name, email, password, phone_number, department } = req.body;
  try {
    await bcrypt.hash(password, 3, async function (err, hash) {
      if (err) {
        console.log(err, "error in hashing");
      } else {
        const user = await usermodel.create({
          name,
          email,
          password: hash,
          phone_number,
          department,
        });
        res.send({ msg: "signup successfull" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// ----------------------------------------------------------------------->
// ---------------------[login endpoint]------------------------------------->
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });

    if (user) {
      const hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, function (err, result) {
        // result == true
        if (result) {
          var token = jwt.sign({ userID: user._id }, "lucifer");
          return res.send({ msg: "login sucessfull", token: token });
        } else {
          return res.send({ msg: "login failed" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});
// --------------------------------------------------------------------------->



const port = 8080;
app.listen(port, async () => {
  try {
    await connection;
    console.log("listening to port 8080");
  } catch (error) {
    console.log(error);
  }
});
