from PIL import Image as PILImage
import numpy as np
from image_processors.base_processor import BaseProcessor
import cv2

class ResizeProcessor(BaseProcessor):
    def __init__(self, width: int = None, height: int = None, maintain_aspect_ratio: bool = True):
        self.width = width
        self.height = height
        self.maintain_aspect_ratio = maintain_aspect_ratio

    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Resize the image while maintaining aspect ratio if specified.
        
        Args:
            image (np.ndarray): Input image (NumPy format)
        
        Returns:
            np.ndarray: Resized image (NumPy format)
        """
        pil_image = PILImage.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        
        if self.maintain_aspect_ratio:
            pil_image.thumbnail((self.width, self.height), PILImage.Resampling.LANCZOS)
        else:
            pil_image = pil_image.resize((self.width, self.height), PILImage.Resampling.LANCZOS)
        
        return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
