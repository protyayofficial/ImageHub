from .base_processor import BaseProcessor
import numpy as np
import cv2

class InvertProcessor(BaseProcessor):
    """Invert image colors"""
    
    def process(self, image: np.ndarray) -> np.ndarray:
        return cv2.bitwise_not(image)