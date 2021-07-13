const express = require('express');
const app = express();
const PORT = process.env.PORT || 1234;
const cors = require('cors');
const MongoInit = require("./config/Mongo");
const userRoutes = require("./Routes/userRoutes");
const imageRoutes = require("./Routes/imageRoutes");

MongoInit();

app.use(express.json({ extended: true, limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(cors({
    origin: "*"
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Authorization,Accept,content-type,application/json');
    next();
});

app.use("/api", userRoutes);
app.use("/auth", imageRoutes);

app.get('/healthcheck', (req, res) => {
    res.send({message: "Server is up and connected!"});
})


app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});