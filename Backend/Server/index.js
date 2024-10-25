require('dotenv').config()  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express(); // Indicate start of a server
console.log('MongoDB URL:', process.env.MONGO_URL);
const rulesRouter= require('./router/rules');



const port = process.env.PORT || 3000; 


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected');

} 

server.use(cors());
server.use(express.json())
server.use('/rules',rulesRouter.router)

  

server.listen(port, () => { // Indicate end of a server
  console.log(`Server started on port ${port}`);
});
