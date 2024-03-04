const express = require("express");

const { authorization } = require("../Auth/authorization");
const { usermodel } = require("../Models/userModel");
const { noticemodel } = require("../Models/noticeModel");
const { connection } = require("../config/db");

const noticeRouter = express.Router();

noticeRouter.post("/create", authorization, async (req, res) => {
  const { title, body, category, date } = req.body;
  const userID = req.userID;

  const user = await usermodel.findOne({ _id: userID });
  console.log(user);
  const notice = await noticemodel.create({
    title,
    body,
    category,
    date,
  });
  res.send({ notice: notice });
});

// noticeRouter.get("/", async (req, res) => {
//   try {
//     const notice= noticemodel.findOne({})
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

noticeRouter.patch("/updating/:noticeID", authorization, async (req, res) => {
  const noticeID = req.params.noticeID;
  const payload = req.body;

  const userID = req.userID;
  console.log(userID);
  const user = await userModel.findOne({ _id: userID });
  console.log(user);
  const user_email = user.email;

  const notice = await noticemodel.findOne({ _id: noticeID });
  const author_email = notice.author_email;

  if (user_email !== author_email) {
    return res.send("you are not a authorised user");
  } else {
    await noticeModel.findByIdAndUpdate(noticeID, payload);
    return res.send({ msg: "notice updated" });
  }
});


noticeRouter.delete("/delete/:noticeID", authorization ,async (req, res) => {
  
  const noticeID = req.params.noticeID;
  const payload = req.body;
  
  const userID = req.userID;
  console.log(userID);
  const user = await userModel.findOne({ _id: userID });
  console.log(user);
  const user_email = user.email;

  const notice = await noticemodel.findOne({ _id: noticeID });
  const author_email = notice.author_email;

  if (user_email !== author_email) {
    return res.send("you are not a authorised user");
  } else {
    await noticeModel.findByIdAndDelete(noticeID, payload);
    return res.send({ msg: "notice deleted" });
  }
});

module.exports = { noticeRouter };
