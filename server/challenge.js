const express = require("express");
const { Challenge } = require("./challengeSchema.js");

const router = express.Router();

router.get("/getChallenges", async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.json(challenges);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
});

router.post("/makeChallenge", async (req, res) => {
    const { name, duration } = req.body;
    if(!name)
    return res.json("Challenge name cannot be empty!");
    if(!duration)
    return res.json("Duration cannot be empty!");
    try {
        const challenge = new Challenge({ name, duration, current: 0 });
        await challenge.save();
        res.json({ message: "Challenge created successfully!" });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/editChallenge", async (req, res) => {
    const newName = req.body.newName;
    const newDuration = req.body.newDuration;
    const newCurr = req.body.newCurr;
    const id = req.body.id;
    const filter = { _id: id };
    const update = { name: newName, duration: newDuration, current: newCurr };
    try {
        const updatedChallenge = await Challenge.findOneAndUpdate(filter, update, {
            new: true 
        });

        if (!updatedChallenge) {
            return res.status(404).send("Challenge not found"); 
        }

        res.json({message: "Challenge updated successfully!"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/removeChallenge/:id", async (req, res) => {
    const id = req.params.id;
    await Challenge.deleteOne({ _id: id })
    .then(() => res.json({ message: "Challenge removed!" }))
    .catch((err) => res.json({ message: err }));
})

module.exports = { challengeRoute: router }; 



