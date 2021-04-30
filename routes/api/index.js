const router = require("express").Router();
const bookRoutes = require("./books");

// Books routes
router.use("/books", bookRoutes);

module.exports = router;
