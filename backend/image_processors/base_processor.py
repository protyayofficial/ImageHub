from PIL import Image
import numpy as np
import base64
from abc import ABC, abstractmethod
from io import BytesIO
import cv2

class BaseProcessor(ABC):
    @abstractmethod
    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Abstract method to process image
        
        Args:
            image (np.ndarray): Input image (NumPy format)
        
        Returns:
            np.ndarray: Processed image (NumPy format)
        """
        pass

    @classmethod
    def encode_image(cls, img: np.ndarray) -> str:
        """
        Encode processed image (numpy array) to base64
        
        Args:
            img (np.ndarray): Processed image (NumPy format)
        
        Returns:
            str: Base64 encoded image
        """
        # Convert NumPy array to PIL image
        pil_img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        
        buffered = BytesIO()
        pil_img.save(buffered, format="PNG")  # Save PIL image to a buffer
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")  # Encode image to base64
        return img_str

    @classmethod
    def decode_image(cls, image_bytes: bytes) -> np.ndarray:
        """
        Decode image bytes to NumPy array
        
        Args:
            image_bytes (bytes): Image bytes
        
        Returns:
            np.ndarray: Decoded image in NumPy format
        """
        # Decode to PIL Image first
        buffer = BytesIO(image_bytes)
        pil_image = Image.open(buffer)
        
        # Convert PIL Image to NumPy array in BGR format (OpenCV default)
        np_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        return np_image