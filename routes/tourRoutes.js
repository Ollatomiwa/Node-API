const express = require ('express');
const tourController = require ('./../controllers/tourController');

const tourRouter = express.Router(); //mounting our routesconst tourRouter = express.Router(); //mounting our routes

tourRouter.param ('id', tourController.checkId); //calling our chwckid router. //param used in xases of id or placeholders

tourRouter.route('/').get(tourController.getTour).post(tourController.checkBody , tourController.createTour);
tourRouter.route ('/:id').get(tourController.getTourId).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = tourRouter;
