const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            g_user: req.body.g_user,
            d_user: req.body.d_user,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});




//GET 1 USER

router.get("/:uname", async (req, res) => {

    try {
        const userLink = await User.findOne({ username: req.params.uname });
        res.status(200).json(userLink);
    }
    catch (err) {
        res.status(500).json(err);
    }


})






//GET ALL USERS

router.get("/", async (req, res) => {
    try {

        let users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;