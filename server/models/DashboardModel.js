const mongoose = require('mongoose');

const DashboardBlocksSchema = new mongoose.Schema({
    imageBlocks : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageBlock"
    },
    videoBlocks: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "VideoBlock"
    },
    surveyBlocks: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"SurveyBlock"
    }
})