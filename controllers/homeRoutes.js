const router = require('express').Router();
const { Car, User } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        // get all cars and join with user data
        const carData = await Car.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["name"]
                }
            ]
        })
        // serialize data so template can read it
        const cars = carData.map((cars) => cars.get({ plain: true}));
    
        res.render('homepage', { 
            cars,
            logged_in : req.session.logged_in
        });
        // res.json(car)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get a car by its id 
router.get('/cars/:id', async (req, res) => {
    try {
        const carData = await Car.findByPk(req.params.id)
        
        // serialize data so template can read it
        const car = carData.get({ plain: true});

        res.render('singlecarpage', { 
            car, 
            logged_in : req.session.logged_in
        });
        // res.json(car)
    } catch (err) {
        res.status(500).json(err)
    }
})

// search a car by the term
router.get('/search/:term', async (req, res) => {
    try {
        // be able to find a car based on the term 
        const carData = await Car.findAll({
            where: {
              [Op.or]: [
               {make_name: { [Op.like]: '%' + req.params.term + '%' }},
               {car_model: { [Op.like]: '%' + req.params.term + '%' }}
              ]
            }
          });
        
        // serialize data so template can read it
        const cars = carData.map((cars) => cars.get({ plain: true}));

        res.render('carpage', { 
            cars, 
            logged_in : req.session.logged_in
        });
        // res.json(cars)
    } catch (err) {
        res.status(500).json(err)
    }
})

// route to get the form to post a new car, use withAuth to prevent access to route
router.get('/new/car', withAuth, async (req, res) => {
    try {
        res.render('newcarformpage', { 
            logged_in : req.session.logged_in
        });
        // res.json(car)
    } catch (err) {
        res.status(500).json(err)
    }
})

// route to login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.render('/');
        return;
    }

    res.render('login');
});

module.exports = router;