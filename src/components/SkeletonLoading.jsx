import React from "react";
import { Skeleton } from "@mui/material";
import { Col } from "react-bootstrap";

const SkeletonLoading = ({ item = 4 }) => {
  return (
    <>
      {new Array(item).fill(null).map((_, i) => (
        <>
          <Col md={4} lg={3} className="mt-5 d-flex justify-content-center p-5">
            <Skeleton
              variant="rectangular"
              style={{ height: "100%", width: "100%" }}
            />
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton />
          </Col>
        </>
      ))}
    </>
  );
};

export default SkeletonLoading;
