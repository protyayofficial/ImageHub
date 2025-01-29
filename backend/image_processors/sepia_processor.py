import cv2
import numpy as np
from .base_processor import BaseProcessor

class SepiaProcessor(BaseProcessor):
    def __init__(self, intensity: float = 1.0):
        # Convert from 0-100% to 0-1 and clip values within the range
        self.intensity = np.clip(intensity / 100, 0, 1)

    def process(self, image: np.ndarray) -> np.ndarray:
        # If intensity is 0, return the original image
        if self.intensity == 0:
            return image

        # Define the sepia filter
        sepia_filter = np.array([
            [0.393, 0.769, 0.189],
            [0.349, 0.686, 0.168],
            [0.272, 0.534, 0.131]
        ])
        
        # Apply the sepia filter
        sepia_img = cv2.transform(image, sepia_filter.T)
        
        # Blend the original image with the sepia image based on intensity
        return cv2.addWeighted(image, 1 - self.intensity, sepia_img, self.intensity, 0)
