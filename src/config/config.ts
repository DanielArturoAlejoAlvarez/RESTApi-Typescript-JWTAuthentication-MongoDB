const keys = {
  port: process.env.PORT || 3000,
  secret_key: process.env.SECRET_KEY || 'secretkey',
  mongodb_uri: process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/example_db',
};

export default keys;
