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
const credentials = require("./middleware/credentials");
const connectDB = require("./config/DBconnection");
const googleRouter = require("./routes/googleLogin");
const corsOptions = require("./config/corsoption");

// const { GrantType, KindeClient } = require("@kinde-oss/kinde-nodejs-sdk");

const PORT = process.env.PORT || 3500;

//connect to mongodb
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

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

// const options = {
//   domain: process.env.KINDE_DOMAIN,
//   clientId: process.env.KINDE_CLIENT_ID,
//   clientSecret: process.env.KINDE_CLIENT_SECRET,
//   redirectUri: process.env.KINDE_REDIRECT_URI,
//   logoutRedirectUri: process.env.KINDE_LOGOUT_REDIRECT_URI,
//   grantType: GrantType.PKCE,
// };

// const kindeClient = new KindeClient(options);
// //routes
// app.get("/", (req, res) => {
//   res.send('<a href="/login">authenticate with google</a>');
// });

// app.get("/login", kindeClient.login(), (req, res) => {
//   return res.redirect("/admin");
// });

// app.get("/callback", kindeClient.callback(), async (req, res) => {
//   return res.redirect("/admin");
// });

// app.get("/register", kindeClient.register(), (req, res) => {
//   return res.redirect("/admin");
// });

app.use("/auth/google", googleRouter);
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/post", require("./routes/blog"));
app.use("/post", require("./routes/likeUserBlog"));
app.use("/post", require("./routes/comment"));
app.use("/logout", require("./routes/logout"));
app.use("/users", require("./routes/user"));
// app.use("/post", require("./routes/post"));

app.use(verifyJWT);

//connect to mongodb
mongoose.connection.once("open", () => {
  console.log("DB connected");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
