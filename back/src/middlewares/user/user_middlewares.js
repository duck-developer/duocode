const Database = require('../../controllers/database/connection')  
const { body, validationResult } = require('express-validator')

class UserMiddlewares {
    constructor() {
        this.db = new Database()
        this.validationRules = [
            body('name')
                .notEmpty().withMessage('Name is required')
                .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
            body('email')
                .isEmail().withMessage('Email is invalid'),
            body('senha')
                .notEmpty().withMessage('Password is required')
                .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        ]
    }

    
    async validate(request, response, next) {
        const errors = await validationResult(request)  
        if (!errors.isEmpty()) {
            return response.status(400).json({ message: errors.array() })
        }
        next()
    }
    async verifyEmailUser(request, response, next) {
        const { email } = request.body
        try {
            const query = 'SELECT * FROM users WHERE email = ?'
            const result  = await this.db.query(query, [email])
            if (result.length > 0) {
                return response.status(400).json({ message: 'Email já cadastrado' })
            }    
        } catch (error) {
            console.error(error)
            return response.status(500).json({ message: error.message })
        }
        next()
    }
    async verifyLoginUser(request, response, next) {
        const { email,senha } = request.body
        try {
            const query = 'SELECT * FROM users WHERE email = ? AND senha = ?'
            const result  = await this.db.query(query, [email,senha])
            if (result.length > 0) {
                return response.status(200).json({ message: 'Usuário Logado' })
            }else{
                return response.status(400).json({ message: '[ERROR] Login incorreto' })

            }
        } catch (error) {
            console.error(error)
            return response.status(500).json({ message: error.message })
        }
        next()
    }
}




module.exports = new UserMiddlewares()
