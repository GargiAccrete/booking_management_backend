const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const validateHeaders = require('./middlewares/validateHeaders.middleware');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require('./routes/auth.route');
const dashboardRoutes = require('./routes/dashboard.route');
const loginRoutes = require('./routes/login.route');
const registerRoutes=require('./routes/register.route');
const categoryRoutes = require('./routes/categories.route');
const httpError = require('./utils/httpError.util');
const { errorMessages, statusCodes } = require('./config/const.config');
const multer = require('multer');
const path = require('path');

// Create application instance
const app = express();
// Initialize environment config
dotenv.config();

// Set server port
const port = Number(process.env.PORT || 3002);

// Common middlewares
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(express.json());
//app.use(express.static('public'));
//app.use(express.static('uploads'));

app.use(cors());
app.options('*', cors());

// app.use(validateHeaders);

// Application routes
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
// app.use('/dashboard', dashboardRoutes );
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});


//File upload
app.post("/upload/:directory/:field", (req, res) => {
  const params = req.params;
  const { directory, field } = params;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'+directory+'/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + Math.floor(Math.random() * 9999) + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage }).single(field);
  upload(req, res, (err) => {
    if(err) {
      res.status(400).send({error: true, message: err});
    }    
    req.file.filename = '/'+directory+'/'+req.file.filename;
    res.send({data: req.file, success: true});
  });
});

app.post("/multiupload/:directory/:field", (req, res) => {
  const params = req.params;
  const { directory, field } = params;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'+directory+'/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + Math.floor(Math.random() * 9999) + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage }).array(field);
  upload(req, res, (err) => {
    if(err) {
      res.status(400).send({error: true, message: err});
    }
    for (let i = 0; i < (req.files).length; i++) {
      //console.log(req.files[i]);
      req.files[i].filename = '/'+directory+'/'+req.files[i].filename;
    }
    res.send({data: req.files, success: true});
  });
});

//Handle 404 requests
app.all('*', (req, res, next) => {
  //console.log(req.route);
  next(httpError(errorMessages.NOT_FOUND, statusCodes.NOT_FOUND));
});

//Error handler middleware
app.use(errorHandler);
//Run the application
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
