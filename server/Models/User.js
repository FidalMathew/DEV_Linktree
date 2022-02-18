const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        g_user: {
            type: String,
        },

        d_user: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },

    },

);

module.exports = mongoose.model("User", UserSchema);