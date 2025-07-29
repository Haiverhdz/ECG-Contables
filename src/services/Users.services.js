import userServices from "../repositories/index.js";
import { createHash, isValidPassword } from "../utils/index.js";
import userModel from "../models/users.models.js"

export default class UsersService {
    async registerUser(userData) {
        const userExists = await userServices.getUserByEmail(userData.email);
        if (userExists) throw new Error("Usuario ya existe");
    
        return await userServices.createUser(userData); 
    }
    

    async getUserByEmail(email) {
        return await userServices.getUserByEmail(email);
    }

    async loginUser(email, password) {
        const user = await userServices.getUserByEmail(email);
        if (!user || !user.password) throw new Error("Usuario no encontrado o sin contraseña");
    
        const isValid = isValidPassword(password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");
    
        return user;
    }

    async getCurrentUser(id) {
        return await userServices.getUserById(id);
    }

    async googleLogin(profile) {
        try {
          const userFound = await userModel.findOne({ email: profile.email });
          if (userFound) return userFound;
    
          const newUser = {
            first_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.email,
            password: '', // como no tiene password, lo dejas vacío
            role: 'user', // asigna rol por defecto
            fromGoogle: true // opcional: útil para diferenciar usuarios
          };
    
          const user = await userModel.create(newUser);
          return user;
        } catch (error) {
          throw new Error("Error en login con Google: " + error.message);
        }
      }
}
