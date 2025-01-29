import cv2
import numpy as np
from .base_processor import BaseProcessor

class SharpnessProcessor(BaseProcessor):
    def __init__(self, intensity: float = 1.0):
        self.intensity = intensity

    def process(self, image: np.ndarray) -> np.ndarray:
        kernel = np.array([[-1,-1,-1], 
                         [-1, 9*self.intensity,-1], 
                         [-1,-1,-1]])
        return cv2.filter2D(image, -1, kernel)