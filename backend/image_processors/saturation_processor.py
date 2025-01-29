from .base_processor import BaseProcessor
import cv2
import numpy as np

class SaturationProcessor(BaseProcessor):
    """Adjust image saturation"""
    
    def __init__(self, factor: float = 1.0):
        self.factor = factor

    def process(self, image: np.ndarray) -> np.ndarray:
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        hsv = hsv.astype('float32')
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * self.factor, 0, 255)
        hsv = hsv.astype('uint8')
        return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)