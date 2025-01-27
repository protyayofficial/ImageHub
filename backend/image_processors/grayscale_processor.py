import cv2
import numpy as np
from .base_processor import BaseProcessor

class GrayscaleProcessor(BaseProcessor):
    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Convert image to grayscale
        
        Args:
            image (np.ndarray): Input color image
        
        Returns:
            np.ndarray: Grayscale image
        """
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)