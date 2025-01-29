from .base_processor import BaseProcessor
import cv2
import numpy as np

class CartoonizeProcessor(BaseProcessor):
    """Apply cartoon effect to image"""
    
    def process(self, image: np.ndarray) -> np.ndarray:
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply median blur
        gray = cv2.medianBlur(gray, 7)
        
        # Detect edges using adaptive threshold
        edges = cv2.adaptiveThreshold(gray, 255, 
            cv2.ADAPTIVE_THRESH_MEAN_C, 
            cv2.THRESH_BINARY, 9, 2)
        
        # Apply bilateral filter
        color = cv2.bilateralFilter(image, 9, 300, 300)
        
        # Combine edges and color image
        cartoon = cv2.bitwise_and(color, color, mask=edges)
        return cartoon