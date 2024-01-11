
import UserService from '../services/user.service'
import express from "express";

const server = express();

server.use(express.urlencoded({ extended: true }));


const userController = express.Router()
const userService = new UserService()


userController.get('/', userService.getUser)
userController.get('/:id', userService.getUserById)
userController.get('/search/:name',userService.getUserByName)
userController.delete('/:id',userService.deleteUserById )
userController.patch('/:id',userService.editUserById)
userController.post('/',userService.postNewUser)
export default userController