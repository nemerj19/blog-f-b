const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");

const saltRounds = bcrypt.genSaltSync(10);
const secret = "asdderr56rfgr56";

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://nemerj19:Sahar123@cluster0.qqqo4fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    //const userDocs = await User.find({ username });
    const userDocs = await User.find({ username });

    if (userDocs.length === 0) {
      //   // No user found with the given username
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userDoc = userDocs[0]; // Assuming there's only one user with the given username

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      });
      // Passwords match
      // res.status(200).json({ success: true });
    } else {
      // Passwords don't match
      res.status(400).json("Incorrect password");
    }
  } catch (error) {
    //   // Error occurred during database query
    res.status(500).json({ error: "Internal server error" });
  }
});
//res.json(passOk);
//});

app.listen(4000);
