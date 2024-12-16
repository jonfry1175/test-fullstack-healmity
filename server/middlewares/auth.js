const { tokenValidator } = require('../helpers/jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        // use bearer token
        const authHeader = req.header("Authorization");
        if (!authHeader) return res.status(401).json({ message: "Token not found", status: 401 });
        const token = authHeader.split(" ")[1];
        // console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        const decoded = tokenValidator(token); // Dekode token untuk mendapatkan informasi pengguna
        req.user = decoded; // Menambahkan informasi pengguna yang didekodekan ke req.user
        next(); // Lanjut ke middleware atau handler berikutnya
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(401).json({ message: error.message });
    }
}

module.exports = authMiddleware