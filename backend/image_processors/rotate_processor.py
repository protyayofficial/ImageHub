import cv2
import numpy as np
from .base_processor import BaseProcessor

class RotateProcessor(BaseProcessor):
    def __init__(self, angle: float = None):
        """
        Initialize RotateProcessor with the rotation angle.

        Args:
            angle (float): The angle (in degrees) to rotate the image.
        """
        self.angle = angle or 0.0

    def process(self, image: np.ndarray) -> np.ndarray:
        """
        Rotate the given image by the specified angle.

        Args:
            image (np.ndarray): Input image (NumPy format).

        Returns:
            np.ndarray: Rotated image (NumPy format).
        """
        # Get the image dimensions
        (h, w) = image.shape[:2]
        # Get the center of the image
        center = (w // 2, h // 2)

        # Create the rotation matrix
        rotation_matrix = cv2.getRotationMatrix2D(center, self.angle, 1.0)

        # Perform the rotation
        rotated_image = cv2.warpAffine(image, rotation_matrix, (w, h))
        return rotated_image
