const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  // MongoClient.connect('mongodb+srv://davitkasradze:Tom&jerry322@cluster0.gmcrstj.mongodb.net/shop?retryWrites=true&w=majority')
  MongoClient.connect('mongodb://root:Password123@127.0.0.1:27017/shop?authSource=admin')
    .then(async client => {
      console.log('Connected!');
      console.log(await client.db().collections())
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
