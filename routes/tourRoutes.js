const express = require ('express');
const tourController = require ('./../controllers/tourController');



const tourRouter = express.Router(); //mounting our routesconst tourRouter = express.Router(); //mounting our routes


tourRouter.route('/').get(tourController.getTour).post(tourController.createTour);
tourRouter.route ('/:id').get(tourController.getTourId).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = tourRouter;
