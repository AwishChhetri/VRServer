import express from "express";
import User from "../Model/userModel.js";
import multer from "multer";
import path from "path";

const app = express();
const router = express.Router();
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.resolve('./public/uploads')));

router.post("/register", upload.array('image'), async (req, res) => {
  console.log(req.body)
  try {
    let roomFiles = [];
    if (req.files.length > 0) {
      roomFiles = req.files.map(file => file.filename);
    } else if (req.file) {
      roomFiles.push(req.file.filename);
    }

   
const user = new User({
  name: req.body.name,
  email: req.body.email,
  number: req.body.number,
  password: req.body.password,
  propDoc: req.file[0].filename, 
  userDoc: req.file[1].filename, 
});

const savedUser = await user.save();
    console.log(savedUser);
    if (savedUser) {
      return res.status(200).json(savedUser);
    } else {
      return res.status(500).send("Failed to save user");
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get('/show', async (req, res) => {
  try {
    const properties = await Property.find();
    console.log(properties);
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.use(router);

export default app;


