import todos from "../models/todo.model.js";

export const createTodo = async (request, response) => {
    try {
        const { title, description } = request.body;
        if (!title || !description) {
            return response.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const todo = await todos.create({
            title,
            description
        });
        response.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo
        });

    } catch (error) {
        console.error("Error in createTodo controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

export const getTodos = async (request, response) => {
    try {
        const allTodos = await todos.find();
        response.status(200).json({
            success: true,
            data: allTodos
        });
    } catch (error) {
        console.error("Error in getTodos controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

export const updateTodo = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, description } = request.body;

        const todo = await todos.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });

        if (!todo) {
            return response.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        response.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        });

    } catch (error) {
        console.error("Error in updateTodo controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTodo = async (request, response) => {
    try {
        const { id } = request.params;

        const todo = await todos.findByIdAndDelete(id);
        if (!todo) {
            return response.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        response.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteTodo controller", error);
        response.status(500).json({ message: "Internal server error" });
    }
};
