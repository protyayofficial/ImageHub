import cv2
import numpy as np
from .base_processor import BaseProcessor

class ContrastProcessor(BaseProcessor):
    def __init__(self, factor: float = 1.5):
        """
        Initialize contrast processor
        
        Args:
            factor (float): Contrast adjustment factor
        """
        self.factor = factor

    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Adjust image contrast
        
        Args:
            image (np.ndarray): Input image
        
        Returns:
            np.ndarray: Contrast-adjusted image
        """
        return cv2.convertScaleAbs(image, alpha=self.factor, beta=0)