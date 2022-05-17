const express = require('express'); 
const res = require('express/lib/response');
const app = express();
//routers
const employees = require('./routes/employees');
const morgan = require('morgan');
const user = require('./routes/user');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', index);

app.use("/user", user);

app.use(auth);

app.use("/employees", employees);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
});