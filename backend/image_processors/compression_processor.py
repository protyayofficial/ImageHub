import cv2
import numpy as np
from .base_processor import BaseProcessor

class CompressionProcessor(BaseProcessor):
    def __init__(self, quality: int = 50):
        """
        Initialize image compression processor
        
        Args:
            quality (int): Compression quality (0-100)
        """
        self.quality = quality

    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Compress image
        
        Args:
            image (np.ndarray): Input image
        
        Returns:
            np.ndarray: Compressed image
        """
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), self.quality]
        _, encoded_image = cv2.imencode('.jpg', image, encode_param)
        return cv2.imdecode(encoded_image, cv2.IMREAD_COLOR)