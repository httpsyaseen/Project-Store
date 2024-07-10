import React from "react";
import { Skeleton } from "@mui/material";
import { Col } from "react-bootstrap";

const SkeletonLoading = () => {
  return (
    <>
      {new Array(4).fill(null).map((_, i) => (
        <>
          <Col md={4} lg={3} className={`mt-5 `}>
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
