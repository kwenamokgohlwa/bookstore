const express = require("express");
const cors = require("cors");
const authRoutes = require('./src/routes/auth.routes');
const bookRoutes = require('./src/routes/book.routes');
const db = require("./src/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function dbInit() {
    db.user.create({
        id: 1,
        username: 'kwenamokgohlwa',
        password: 'test',
        pseudonym: 'Motsumi',
    });

    db.book.create({
        id: 1,
        author: 1,
        title: 'Forty-Two: 42',
        description: 'The Coders Guide to the Galaxy',
        price: 424.24,
        image: 'image/9782123456803.png'
    });
  }

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop & Resync DB');
    dbInit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bookstore App - Welcome, made by Kwena Mokgohlwa." });
});

authRoutes(app);
bookRoutes(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

