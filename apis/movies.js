const express = require("express")

const router = express.Router()

const moviesFunctions = require("../controllers/moviesControllers")

router.get("/get-movie-by-title",moviesFunctions.handleFetchMovieByTitle)

router.get("/get-movie-by-year",moviesFunctions.handleFetchMoviesByYear)

router.delete("/delete-movie-by-title",moviesFunctions.handleDeleteMovieByTitle)

module.exports = router