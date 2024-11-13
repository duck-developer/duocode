// const connection = require('../../controllers/database/connection')

// const getAllUser = async () => {
//     const query = "SELECT * FROM users"
//     const [users] = await connection.query(query)
//     return users
// }

// const createUser = async (user) => {
//     const { name, email, senha } = user
//     const query = "INSERT INTO users (nome, email, senha) VALUES ($1,$2,$3)"
//     const createdUser = await connection.tableUser.query(query, [name, email, senha])
//     return { insertId: createdUser.insertId }
// }

// const deleteUser = async (id) => {
//     const query = "DELETE FROM users WHERE id_user = $1"
//     const removeUser = await connection.tableUser.query(query, [id])
//     return removeUser
// }
// const updateUser = async (id, user) => {
//     const { name, email, senha } = user
//     const query = "UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id_user = $4"
//     const updateUser = await connection.tableUser.query(query, [name, email, senha, id])
//     return updateUser
// }

// module.exports = {
//     getAllUser,
//     createUser,
//     deleteUser,
//     updateUser
// }


const Database = require('../../controllers/database/connection')

class UserModel {
    constructor() {
        this.db = new Database()
    }

    async getAllUsers() {
        try {
            const sql = 'SELECT * FROM users'
            const users = await this.db.query(sql)
            return users
        } catch (error) {
            console.error('Erro ao obter usuários:', error)
            throw error
        }
    }
    async createUser(user) {
        try {
            const { name, email, senha } = user
            const sql = 'INSERT INTO users (nome, email, senha) VALUES (?,?,?)'
            const createdUser = await this.db.query(sql,[name, email, senha])
            return {insertId: createdUser.insertId}
        } catch (error) {
            console.error('Erro ao criar usuários:', error)
            throw error
        }
    }
}

module.exports = UserModel
