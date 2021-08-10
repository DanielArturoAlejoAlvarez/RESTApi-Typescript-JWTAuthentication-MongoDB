const keys = {
  port: process.env.PORT || 3000,
  secret_key: process.env.SECRET_KEY || "wNEEU1q6Gcaw5bTqJeReiT4IygebfDog",
  mongodb_uri:
    process.env.MONGO_DB ||
    "mongodb://127.0.0.1:27017/restapi_typescript_jwt_db",
};

export default keys;
