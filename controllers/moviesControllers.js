const mongoose = require("mongoose")

const Schema = mongoose.Schema

const baseSchema = new Schema({}, { discriminatorKey: 'type' });
const MoviesModel = mongoose.model('movies', baseSchema);

const handleFetchMovieByTitle = async(req,res)=>{
    try{
        const movies = await MoviesModel.findOne({
            title:{
                $regex:req.query.search,
                $options:"i"
            }
        })
        return res.status(200).json(movies)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleFetchMoviesByYear = async(req,res)=>{
    try{
       
        const movies = await MoviesModel.find({
            release_date:{
                $regex:req.query.search
            }
        })
        return res.status(200).json(movies)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleFetchMoviesByGenre = async(req,res)=>{
    try{
       
        const movies = await MoviesModel.find({
            release_date:{
                $regex:req.query.search
            }
        })
        return res.status(200).json(movies)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

const handleDeleteMovieByTitle = async(req,res)=>{
    try{
       
        await MoviesModel.findOneAndDelete({
            title:req.body.title

        })
        return res.status(204)
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Something went wrong"
        })
    }
}

module.exports = {
    handleFetchMovieByTitle,
    handleFetchMoviesByYear,
    handleDeleteMovieByTitle
}