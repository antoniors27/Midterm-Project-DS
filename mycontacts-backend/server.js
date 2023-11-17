const express = require("express");
const app = express();
const routes = require("./routes/employeeRoutes");
const errorHandler = require("./middlewares/errorHandler");
const pool = require("./dbDriver/mysql");
const cors = require('cors');


const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, 
  credentials: true,
  allowedHeaders: [
    'Authorization',
    'Authorization-Refresh',
    'Content-Type',
    'responsetype',
  ],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", routes);
app.use(errorHandler);

const PORT = process.env.PORT;

pool.getConnection()
  .then((connection) => {
    console.log("Database connected");
    connection.release();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
});
