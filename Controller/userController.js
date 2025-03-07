import User from "../models/userModels.js";

class UserController {
    async createUser(username, useremail, password, isAdmin){
        try {
            const user = await User.create(username, useremail, password, isAdmin)
            return {message: 'Usuário criado com sucesso',user}
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getUsers(){
        try {
            const users = await User.findAll()
            return users
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async loginUser(username, password){
        try {
            const user = await User.findOne({
                where: {
                    username: username,
                    password: password
                }
            })
            return user
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export default new UserController()