const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')
const GModel=require("./models/gcomplaint");
const EModel=require("./models/ecomplaint");
const CModel=require("./models/ccomplaint");
const AModel=require("./models/acomplaint");
const warden=require("./models/Warden");
const EWorker=require("./models/EWorker");
const AdModel=require("./models/admin");
const {ObjectId } = require('mongodb');

const app = express()
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())
mongoose.connect('mongodb://127.0.0.1:27017');
const checkRole = (role) => (req, res, next) => {
  console.log(req.user);
  console.log(role+" "+req.user.role)
  if (req.user && req.user.role === role) {
    next();
  } else {
    return res.json("unauthorized acess");
  }
};
app.get('/dashboard', verifyUser, checkRole('Student'), (req, res) => {
  // Accessible only to students
  res.json("Success");
});

app.get('/wdashboard', verifyUser, checkRole('Warden'), (req, res) => {
  // Accessible only to wardens
  res.json("Success");
});
app.get('/wodashboard', verifyUser, checkRole('Worker'), (req, res) => {
  // Accessible only to wardens
  res.json("Success");
});
app.get('/adashboard', verifyUser, checkRole('Admin'), (req, res) => {
  // Accessible only to wardens
  res.json("Success");
});
app.get('/logout',(req,res)=>{
   res.clearCookie('token');
   return res.json("success");
})
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username);
    console.log("password is"+password);
    //console.log( UserModel.findOne({username:username}));
    UserModel.findOne({username:username})
    .then(user => {
     // console.log(user.password);
        if(user) {
                if(password===user.password) {
                  const token = jwt.sign({username: user.username,password:user.password,role:user.role},
                    "jwt-secret-key", {expiresIn: '1d'})  
                    res.cookie('token', token)
                    return res.json({Status: "Success"})
                }else {
                    return res.json("The password is incorrect")
                }
            }
        else {
            return res.json("No record existed")
        }
    })
})
app.post('/loginf', (req, res) => {
  const {username, password} = req.body;
  console.log(username);
  console.log("password is"+password);
  //console.log( UserModel.findOne({username:username}));
  AdModel.findOne({username:username})
  .then(user => {
   // console.log(user.password);
      if(user) {
              if(password===user.password) {
                const token = jwt.sign({username: user.username,password:user.password,role:user.role},
                  "jwt-secret-key", {expiresIn: '1d'})  
                  res.cookie('token', token)
                  return res.json({Status: "Success"})
              }else {
                  return res.json("The password is incorrect")
              }
          }
      else {
          return res.json("No record existed")
      }
  })
})
app.post('/login/warden', (req, res) => {
  const { username, password } = req.body;

  warden.findOne({ username })
    .then(user => {
      if (user) {
        if (password === user.password) {
          const token = jwt.sign({ username: user.username, password: user.password,role:user.role},
            "jwt-secret-key", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success" });
        } else {
          return res.json("The password is incorrect");
        }
      } else {
        return res.json("No record existed");
      }
    })
    .catch(err => res.json(err));
});
app.post('/register1', async (req, res) => {
  const {name,expertise,username, password,Phoneno } = req.body;

  try {
    const existingUser = await EWorker.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const user = new EWorker({name,expertise,username, password,Phoneno });
    await user.save();

    res.status(201).send('Registration successful');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal server error');
  }
});
app.post('/register', async (req, res) => {
  const {username,password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const user = new UserModel({username, password });
    await user.save();

    res.status(201).send('Registration successful');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal server error');
  }
});
app.post('/register2', async (req, res) => {
  const { username, password,HostelName } = req.body;

  try {
    const existingUser = await warden.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const user = new warden({ username, password, HostelName });
    await user.save();

    res.status(201).send('Registration successful');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal server error');
  }
});
app.post('/login/worker', (req, res) => {
    const {username,password} = req.body;
   console.log(username);
    console.log("password is"+password);
    //console.log( UserModel.findOne({username:username}));
    EWorker.findOne({username:username})
    .then(user => {
     // console.log(user.password);
        if(user) {
                if(password===user.password) {
                  const token = jwt.sign({ username: user.username, password: user.password,role:user.role},
                    "jwt-secret-key", { expiresIn: '1d' });
                  res.cookie('token', token);
                  return res.json({ Status: "Success" });
                }else {
                    return res.json("The password is incorrect")
                }
            }
        else {
            return res.json("No record existed")
        }
    })
})
app.listen(8080, () => {
    console.log("Server is Running")
})
app.get('/workers/available',  (req, res) => {
      EWorker.find()
      .then(worker=>res.json(worker))
      .catch(err=>res.json(err)); 
  });
 
  app.get('/updatecomp/:id', (req, res) => {
    console.log("hello");
    const { id } = req.params;
    console.log(id);
  
    EModel.findById(id)
      .then(complaint => {
        if (!complaint) {
          return res.status(404).send('Complaint not found');
        }
        res.json(complaint); // Send the complaint data without updating
      })
      .catch(err => res.status(500).send('Error fetching complaint'));
  });
 app.put("/update/:id",async(req,res)=>{

    const idd =req.params.id;
    console.log(idd);
    const id=req.body.selectedWorker;
    console.log(id);
     // 2. Find worker by ID (selected worker)
     const worker = await EWorker.findById(id);
     console.log(worker.name);
     console.log(worker.username);
     console.log(worker.Phoneno);
     if (!worker) {
       return res.status(404).json({ message: "Worker not found" }); // Handle missing worker
     }
     // 3. Update complaint status in selected worker (optional)
     await EWorker.findByIdAndUpdate(id, {
       assignedComplaint: true, // Assuming this is the desired update
     });
 
     // 4. Update assigned worker in EModel (using retrieved worker's name)
     await EModel.findByIdAndUpdate(idd, {
        $set: {
          "Worker.username": worker.username, // Update username using $set operator
          "Worker.name": worker.name, // Update name
          "Worker.Phoneno": worker.Phoneno, // Update phone number
        },
      }, { new: true });
  });
app.post('/create', (req, res) => {
  //  console.log(req.body);
    EModel.create(req.body)
    .then(ecomplaint => res.json(ecomplaint))
    .catch(err => res.json(err))
})
app.get('/wgetcomp/:HostelName/:category', async (req, res) => {
    const { HostelName, category } = req.params;
    console.log(HostelName +" "+category);
    try {
      // Combine query criteria using a single object
      const query = { HostelName, category };
  
      const complaints = await EModel.find(query); // Use await to wait for data
      console.log(complaints);
      res.json(complaints); // Send the response after data is fetched
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' }); // Handle errors
    }
  });
  app.delete('/delcomp/:id',  (req, res) => {
    const { id } = req.params;
     EModel.deleteOne({ _id: id}).then(
      res=>res.json(res))
      .catch(err=>res.json(err));
  });
  app.delete('/dels/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const deletedUser = await UserModel.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
  
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal server error');
    }
  });
  app.delete('/delw/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const deletedUser = await warden.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
  
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal server error');
    }
  });
  app.delete('/delwo/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const deletedUser = await EWorker.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
  
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal server error');
    }
  });
  
app.get('/getcompp/:username',(req,res)=>{
    //console.log("hello")
    const id=req.params.username;
    console.log(id);
   // console.log(id);
   // EModel.find({idd:username});
   // console.log(x.idd);
    const comp=EModel.find({idd:id}).then(complaint=>res.json(complaint))
    .catch(err=>res.json(err));
    console.log(comp);
})
app.get('/getecompw/:username', (req, res) => {
    const username = req.params.username;
  
    EModel.find({"Worker.username": username})
      .then(complaints => {
       // console.log(complaints); // Log the found complaints
        if (complaints) {
          res.json(complaints);
        } else {
          res.status(404).json({ message: 'No complaints found for worker' });
        }
      })
      .catch(err => {
        console.error(err); // Log the error to the console
        res.status(500).json({ message: 'Internal server error' });
      });
  })
  app.put('/eupdatecomplaint/:complaintId', async (req, res) => {
    const { complaintId } = req.params;
    const { status } = req.body; 
    const comp=await EModel.findByIdAndUpdate(complaintId, {
        Status:status, // Assuming this is the desired update
      });
  });
  app.put('/cupdatecomplaint/:complaintId', async (req, res) => {
    const { complaintId } = req.params;
    const { status } = req.body; 
    const comp=await EModel.findByIdAndUpdate(complaintId, {
        Status:status, // Assuming this is the desired update
      });
  });
app.get('/getecompp/:id',(req,res)=>{
    //console.log("hello")
    const id=req.params.id;
   // console.log(id);
   // EModel.find({idd:username});
   // console.log(x.idd);
    EModel.find({_id:id}).then(complaint=>res.json(complaint))
    .catch(err=>res.json(err));
})
app.post('/gcreate', (req, res) => {
   // console.log(req.body);
    AModel.create(req.body);
    GModel.create(req.body)
    .then(gcomplaint => res.json(gcomplaint))
    .catch(err => res.json(err))
})
app.post('/ccreate', (req, res) => {
   // console.log(req.body);
    AModel.create(req.body);
    CModel.create(req.body)
    .then(gcomplaint => res.json(gcomplaint))
    .catch(err => res.json(err))
})
app.get("/",(req,res)=>{
    res.send("hello");
})