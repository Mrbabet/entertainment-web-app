const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies

app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/movie", require("./routes/api/movie"));

const options = {
  method: "POST",
  url: "https://api.themoviedb.org/4/auth/request_token",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
  data: {
    redirect_to: "http://localhost:5173/welcome",
  },
};

app.get("/create-token", async (req, res) => {
  try {
    const response = await axios.request(options);
    const requestToken = response.data.request_token;
    getAccessTokenOptions.data.request_token = requestToken;

    res.redirect(
      `https://www.themoviedb.org/auth/access?request_token=${requestToken}`
    );
  } catch (error) {
    console.error("Error obtaining request token:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getAccessTokenOptions = {
  method: "POST",
  url: "https://api.themoviedb.org/4/auth/access_token",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
  data: {
    request_token: null,
  },
};

app.get("/get-access-token", async (req, res) => {
  try {
    const response = await axios.request(getAccessTokenOptions);
    const accessToken = response.data.access_token;

    res.json({ access_token: accessToken });
  } catch (error) {
    console.error("Error obtaining access token:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
const logoutOptions = {
  method: "DELETE",
  url: "https://api.themoviedb.org/4/auth/access_token",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

app.delete("/logout-tmdb"),
  async (req, res) => {
    await axios.request(logoutOptions);
    res.json({ message: "Logout successful" });
    try {
    } catch (error) {}
  };

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
