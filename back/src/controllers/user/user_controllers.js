// const userModel = require('../../models/user/user_models')

// const getAllUser = async (_request, response) => {
//     const { rows } = await userModel.getAllUser()
//     return response.status(200).json(rows)
// }

// const createUser = async (request, response) => {
//     const createdUser = await userModel.createUser(request.body)
//     return response.status(201).json(createdUser)
// }

// const deleteUser = async (request, response) => {
//     const { id } = request.params
//     await userModel.deleteUser(id)
//     return response.status(204).json()
// }
// const updateUser = async (request, response) => {
//     const { id } = request.params
//     await userModel.updateUser(id, request.body)
//     return response.status(204).json()

// }
// module.exports = {
//     getAllUser,
//     createUser,
//     deleteUser,
//     updateUser
// }

const UserModel = require('../../models/user/user_models')

class UserController {
    constructor() {
        this.userModel = new UserModel()
    }

    async getAllUsers(request, response) {
        try {
            const users = await this.userModel.getAllUsers()
            return response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao obter usuários', error })
        }
    }
    
    async createUser(request, response) {
        try {
            const createdUser = await this.userModel.createUser(request.body)
            return response.status(201).json(createdUser)
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao criar usuários', error })
        }
    }

}

module.exports = new UserController()
