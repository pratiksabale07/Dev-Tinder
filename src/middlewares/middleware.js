// Use this middleware to check if the user is authorized
// If authorized, call next() to proceed to the next middleware or route handler
export const adminAuth = (req, res, next) => {
    const token = "xyz";
    const autorized = token === "xyz";
    if (!autorized) {
        res.status(401).send("Admin Unauthorized");
    } else {
        console.log("Admin authorized");
        next();
    }
}

export const userAuth = (req, res, next) => {
    const token = "abc";
    const autorized = token === "abc";
    if (!autorized) {
        res.status(401).send("User Unauthorized");
    } else {
        console.log("User authorized");
        next();
    }
}