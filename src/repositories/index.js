import userDAOInstance from "../DAOs/factory.js";
import UsersRepository from "./users.repositories.js";

const userServices = new UsersRepository(userDAOInstance);
export default userServices;
