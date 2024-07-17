import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { isUserAllowed, getReviews, submitReview } from "../../utils/api";
import base64ToImageUrl from "../../utils/imageConverter";
import notify from "../../utils/notify";
import NoReview from "../../assets/review.svg";

const ReviewSection = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  padding: theme.spacing(4),
  backgroundColor: "white",
}));

const ReviewForm = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ReviewList = styled(Box)(({ theme }) => ({
  "& > *:not(:last-child)": {
    marginBottom: theme.spacing(2),
  },
}));

const ReviewCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
}));

const ProductReviews = ({ productId }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isAllowed, setisAllowed] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(reviews);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allow = await isUserAllowed(productId);
      setisAllowed(allow);
      const review = await getReviews(productId);
      setReviews(review);
      setLoading(false);
    };
    fetchData();
  }, [productId, refreshTrigger]);

  const handleSubmitReview = () => {
    setLoading(true);
    if (reviewText.trim() && reviewRating > 0) {
      const newReview = {
        rating: reviewRating,
        review: reviewText,
        product: productId,
      };
      submitReview(newReview)
        .then(() => {
          notify("Review Posted Successfully");
          setReviewText("");
          setReviewRating(0);
          setRefreshTrigger((c) => c + 1);
          setLoading(false);
          setisAllowed(false);
        })
        .catch((err) => {
          setLoading(false);
          notify("Error Posting Review", "error");
        });
    }
  };

  return (
    <ReviewSection>
      <Typography variant="h3" gutterBottom>
        {reviews.length === 0 ? "No" : "Product"} Reviews
      </Typography>
      {isAllowed && (
        <ReviewForm>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <Typography component="legend">Your Rating:</Typography>
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => {
                setReviewRating(newValue);
              }}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitReview}
            disabled={!reviewText.trim() || reviewRating === 0 || loading}
          >
            {!loading ? "Submit" : "Submitting"} Review
          </Button>
        </ReviewForm>
      )}
      <Divider sx={{ marginBottom: 4 }} />
      <ReviewList>
        {!loading && reviews.length === 0 && (
          <>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 5,
                padding: 5,
              }}
            >
              <img
                src={NoReview}
                alt="Profile"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Box>
          </>
        )}
        {reviews.map((review) => (
          <ReviewCard key={review._id}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ marginBottom: 2 }}
              >
                <Avatar
                  src={
                    review.user?.photo && base64ToImageUrl(review.user.photo)
                  }
                  alt={review.user.name}
                />
                <Typography variant="h6">{review.user.name}</Typography>
              </Stack>
              <Rating value={review.rating} readOnly sx={{ marginBottom: 1 }} />
              <Typography variant="body1" paragraph>
                {review.review}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Posted on {review.reviewDate.toLocaleString()}
              </Typography>
            </CardContent>
          </ReviewCard>
        ))}
      </ReviewList>
    </ReviewSection>
  );
};

export default ProductReviews;
