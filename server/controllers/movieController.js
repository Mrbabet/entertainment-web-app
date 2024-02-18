const data = {
  movie: require("../model/movie.json"),
  setMovie: function (data) {
    this.movie = data;
  },
};

const getAllMovies = (req, res) => {
  res.json(data.movie);
};

module.exports = {
  getAllMovies,
};
