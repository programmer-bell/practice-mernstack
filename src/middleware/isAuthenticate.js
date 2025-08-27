export const isAuthenticated = (request, response, next) => {
    try {
        const token = request.cookies.token;
    if (!token) {
        return response.status(401).json({
            success: false,
            message: "Unauthorized"
        });
     }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return response.status(403).json({
            success: false,
            message: "Forbidden"
        });
    }
    request.user = decoded;
    next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

