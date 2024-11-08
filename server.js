const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require("./db")
const bodyParser = require("body-parser")

// app.use(bodyParser)
app.use(express.json())

app.use("/api/cars", require("./routes/carsRoutes"))
app.use("/api/users", require("./routes/usersRoutes"))
app.use("/api/bookings", require("./routes/bookingRouter"))

app.listen(port, () => console.log(`Express app listen port ${port}`))