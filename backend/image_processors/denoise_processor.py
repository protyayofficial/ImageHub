from .base_processor import BaseProcessor
import cv2
import numpy as np

class DenoiseProcessor(BaseProcessor):
    """Remove image noise using Non-Local Means Denoising"""
    
    def __init__(self, h: float = 10.0, template_window_size: int = 7, search_window_size: int = 21):
        self.h = h
        self.template_window_size = template_window_size
        self.search_window_size = search_window_size

    def process(self, image: np.ndarray) -> np.ndarray:
        return cv2.fastNlMeansDenoisingColored(
            image,
            h=self.h,
            templateWindowSize=self.template_window_size,
            searchWindowSize=self.search_window_size
        )