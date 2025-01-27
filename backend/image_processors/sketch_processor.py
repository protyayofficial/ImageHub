import cv2
import numpy as np
from .base_processor import BaseProcessor

class PencilSketch(BaseProcessor):
    """Apply a high-quality pencil sketch effect to an image."""

    def __init__(self, blur_sigma: int = 5, ksize: tuple = (21, 21), sharpen_value: int = 2) -> None:
        self.blur_sigma = blur_sigma
        self.ksize = ksize
        self.sharpen_value = sharpen_value

    def dodge(self, front: np.ndarray, back: np.ndarray) -> np.ndarray:
        """Apply the dodge blend mode between two images."""
        result = front * 255.0 / (255.0 - back) 
        result[result > 255] = 255
        result[back == 255] = 255
        return result.astype('uint8')

    def sharpen(self, image: np.ndarray) -> np.ndarray:
        """Apply sharpening using a kernel filter."""
        if self.sharpen_value is not None and isinstance(self.sharpen_value, int):
            kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
            return cv2.filter2D(src=image, ddepth=-1, kernel=kernel)
        return image

    def process(self, frame: np.ndarray) -> np.ndarray:
        """Apply the full pencil sketch effect to the image."""
        
        # Step 1: Convert image to grayscale with contrast enhancement

        grayscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        grayscale = cv2.equalizeHist(grayscale)  # Enhance contrast
        grayscale = cv2.cvtColor(grayscale, cv2.COLOR_GRAY2BGR)  # Convert to 3-channel grayscale

        # Step 2: Invert the grayscale image
        inverted_img = 255 - grayscale

        # Step 3: Apply Gaussian Blur to the inverted image
        blur_img = cv2.GaussianBlur(inverted_img, self.ksize, self.blur_sigma)

        # Step 4: Dodge the blurred image with the grayscale
        final_img = self.dodge(grayscale, blur_img)

        # Step 5: Apply sharpening to the final image
        sharpened_image = self.sharpen(final_img)

        return sharpened_image