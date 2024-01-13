require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const verifyJWT = require("./middleware/verfiyJwt");
const connectDB = require("./config/DBconnection");
const googleRouter = require("./routes/googleLogin");
const PORT = process.env.PORT || 3500;

//connect to mongodb
connectDB();
// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(helmet());
app.use(morgan("dev"));

//middleware for cookies
app.use(cookieParser());

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//routes
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">authenticate with google</a>');
});

app.use("/auth/google", googleRouter);
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/user/blog", require("./routes/blog"));

app.use(verifyJWT);

//connect to mongodb
mongoose.connection.once("open", () => {
  console.log("DB connected");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
