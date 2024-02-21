const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fsPromises = require("fs").promises;
require("dotenv").config();

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const baseUrl = "https://api.themoviedb.org/4";

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Step 1: Request a token from TMDb
    const {
      data: { request_token },
    } = await axios.post(
      `${baseUrl}/auth/request_token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );

    // Redirect the user to TMDb for approval
    const approvalUrl =
      "https://www.themoviedb.org/auth/access?request_token=YOUR_REQUEST_TOKEN";

    return res.json({ approvalUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Add a callback route to handle the approved request token
const handleApproval = async (req, res) => {
  try {
    const { request_token } = req.query;

    // Step 2: Exchange the approved request token for an access token
    const {
      data: { access_token },
    } = await axios.post(
      `${baseUrl}/auth/access_token`,
      { request_token },
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );

    console.log("TMDb Access Token Data:", access_token);

    // Additional steps as needed

    res.json({ access_token });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { handleLogin, handleApproval };
