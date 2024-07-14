import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import imageCompression from "browser-image-compression";
import notify from "../../utils/notify";
import { useDispatch } from "react-redux";
import { updateInfo } from "../../features/authSlice";

const ImageUpload = () => {
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!base64Image) return notify("Upload any Image First", "error");
    const photo = base64Image.split(",")[1];
    const result = await dispatch(updateInfo({ photo }));
    console.log(result);
    if (result.type.includes("fulfilled")) {
      notify("Image updated Successfully");
      setBase64Image("");
    }
  };

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    if (file) {
      try {
        // Compress the image file
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        const reader = new FileReader();

        reader.onloadend = () => {
          setBase64Image(reader.result);
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };

  const handleImageClear = () => {
    setBase64Image("");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Upload Image
      </Typography>
      <form onSubmit={handleSubmit}>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          {loading ? "Uploading Image" : "Select Image"}

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {base64Image && (
          <Box mt={2}>
            <Box mt={2} sx={{ position: "relative", display: "inline" }}>
              <img
                src={base64Image}
                alt="Selected"
                style={{ width: "200px" }}
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={handleImageClear}
                >
                  Cancel Upload
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Image
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ImageUpload;
