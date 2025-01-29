import cv2
import numpy as np
from .base_processor import BaseProcessor

class BrightnessProcessor(BaseProcessor):
    def __init__(self, factor: float = 1.5):
        """
        Initialize brightness processor
        
        Args:
            factor (float): Brightness adjustment factor
        """
        self.factor = factor

    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Adjust image brightness
        
        Args:
            image (np.ndarray): Input image
        
        Returns:
            np.ndarray: Brightness-adjusted image
        """
        
        if self.factor == 0:
            return image
        
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        hsv[:,:,2] = np.clip(hsv[:,:,2] * self.factor, 0, 255)
        return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)