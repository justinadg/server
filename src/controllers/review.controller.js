const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService, appointmentService } = require('../services');

const createReview = catchAsync(async (req, res) => {
  const review = await reviewService.createReview(req.body);
  
  // Update the appointment with review data
  await appointmentService.updateAppointmentById(review.appointmentId, {
    review: {
      rating: review.rating,
      title: review.title,
      text: review.text,
      date: review.date
    }
  });

  res.status(httpStatus.CREATED).send(review);
});

const getReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getReviews(req.query);
  res.status(httpStatus.OK).send(reviews);
});

const getReview = catchAsync(async (req, res) => {
  const review = await reviewService.getReviewById(req.params.reviewId);
  if (!review) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Review not found' });
  } else {
    res.status(httpStatus.OK).send(review);
  }
});

const updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReviewById(req.params.reviewId, req.body);
  
  // Update the appointment with review data
  await appointmentService.updateAppointmentById(review.appointmentId, {
    review: {
      rating: review.rating,
      title: review.title,
      text: review.text,
      date: review.date
    }
  });

  res.status(httpStatus.OK).send(review);
});

const deleteReview = catchAsync(async (req, res) => {
  await reviewService.deleteReviewById(req.params.reviewId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
