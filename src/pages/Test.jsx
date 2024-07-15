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
import { isUserAllowed, getReviews, submitReview } from "../utils/api";
import base64ToImageUrl from "../utils/imageConverter";
import notify from "../utils/notify";

const ReviewSection = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: "0 auto",
  padding: theme.spacing(4),
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

const fakeReviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 4,
    text: "Great product! I really enjoyed using it.",
    date: "2023-07-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "Absolutely amazing! Exceeded my expectations.",
    date: "2023-07-09",
  },
];

const ProductReviews = ({ productId = "668ae1e8807f117cb412166a" }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isAllowed, setisAllowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const allow = await isUserAllowed(productId);
      setisAllowed(allow);
      const review = await getReviews(productId);
      console.log(review);
      setReviews(review);
    };
    fetchData();
  }, [productId]);

  const handleSubmitReview = () => {
    if (reviewText.trim() && reviewRating > 0) {
      const newReview = {
        rating: reviewRating,
        text: reviewText,
        product: productId,
      };
      submitReview(newReview)
        .then(() => notify("Review Posted Successfully"))
        .catch((err) => notify(err.message, "error"));
      setReviewText("");
      setReviewRating(0);
    }
  };

  return (
    <ReviewSection>
      <Typography variant="h4" gutterBottom>
        Product Reviews
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
            disabled={!reviewText.trim() || reviewRating === 0}
          >
            Submit Review
          </Button>
        </ReviewForm>
      )}
      <Divider sx={{ marginBottom: 4 }} />
      <ReviewList>
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
                  src={base64ToImageUrl(review.user.photo)}
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
