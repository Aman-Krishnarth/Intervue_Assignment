const { createPoll, getAllPolls } = require("../controller/pollController");

const router = require("express").Router();

router.post("/create", createPoll);
router.get("/allPolls", getAllPolls);

module.exports = router;
