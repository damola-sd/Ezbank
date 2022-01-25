const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const dotenv = require("dotenv");

dotenv.config();

module.exports.connect = async () => {
  const mongod = await MongoMemoryServer.create();

  const uri = await mongod.getUri();
  //   const tempDB = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.ajb0x.mongodb.net/TestDB?retryWrites=true&w=majority`;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports.closeDatabase = async () => {
  const mongod = await MongoMemoryServer.create();

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop;
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
