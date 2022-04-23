const router = require('express').Router();
const { Car } = require('../../models');
const withAuth = require('../../utils/auth');

// route to post a new car
router.post('/new', withAuth, async (req, res) => {
    try {
        const newCar = await Car.create({
            ...req.body,
            user_id: req.session.user_id,
        })

        res.status(200).json(newCar);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})


module.exports = router;