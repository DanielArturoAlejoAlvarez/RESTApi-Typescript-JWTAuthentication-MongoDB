const keys = {
  mongodb_uri:
    process.env.MONGO_DB ||
    "mongodb://127.0.0.1:27017/restapi_typescript_jwt_db",
};

export default keys;
