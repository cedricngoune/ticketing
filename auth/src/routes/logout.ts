import express from "express";

const router = express.Router();
router.post("/api/users/logout", (req, res) => {
  res.send("Hello world ");
});
export { router as logoutRouter };
