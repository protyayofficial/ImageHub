import cv2
import numpy as np
from .base_processor import BaseProcessor

class SharpnessProcessor(BaseProcessor):
    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Increase image sharpness
        
        Args:
            image (np.ndarray): Input image
        
        Returns:
            np.ndarray: Sharpened image
        """
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        return cv2.filter2D(image, -1, kernel)