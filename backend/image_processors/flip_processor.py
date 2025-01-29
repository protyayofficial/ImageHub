import cv2
import numpy as np
from .base_processor import BaseProcessor

class FlipProcessor(BaseProcessor):
    def __init__(self, direction: str = 'horizontal'):
        self.direction = direction

    def process(self, image: np.ndarray) -> np.ndarray:
        flip_code = 1 if self.direction == 'horizontal' else 0
        return cv2.flip(image, flip_code)