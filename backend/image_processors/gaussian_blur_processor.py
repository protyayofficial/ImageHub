import cv2
import numpy as np
from .base_processor import BaseProcessor

class GaussianBlurProcessor(BaseProcessor):
    def __init__(self, radius: int = 3, sigma: float = 0):
        self.radius = radius
        self.sigma = sigma

    def process(self, image: np.ndarray) -> np.ndarray:
        # Ensure kernel size is odd
        kernel_size = int(self.radius) * 2 + 1
        return cv2.GaussianBlur(image, (kernel_size, kernel_size), self.sigma)