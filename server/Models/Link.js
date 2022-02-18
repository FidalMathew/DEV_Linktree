const mongoose = require("mongoose");

const Link = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        links: [
            {
                text: {
                    type: String,

                },
                link: {
                    type: String,

                },

            },
        ],
    },

);

module.exports = mongoose.model("Link", Link);