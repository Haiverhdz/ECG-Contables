import env from "../config/env.js";
import connectDB from "../database/db.js";

let userDAOInstance;

switch (env.persistence) {
  case "MONGO":
    connectDB(env.mongodb_url);
    const { default: UsersMongo } = await import("./mongoDB/users.dao.js");
    userDAOInstance = new UsersMongo();
    break;

  case "MEMORY":
    const { default: UsersMemory } = await import("./memory/memory.dao.js");
    userDAOInstance = new UsersMemory();
    break;

  default:
    throw new Error("Persistencia no válida");
}

export default userDAOInstance;
