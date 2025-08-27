import express from 'express';
import {createTodo,getTodos,updateTodo,deleteTodo} from "../controller/todoController.js";
import {isAuthenticated} from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(isAuthenticated, getTodos);
router.route("/:id").put(isAuthenticated, updateTodo).delete(isAuthenticated, deleteTodo);

export default router;
