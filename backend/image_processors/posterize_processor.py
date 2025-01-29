from .base_processor import BaseProcessor
import numpy as np

class PosterizeProcessor(BaseProcessor):
    """Posterize image by reducing color levels"""
    
    def __init__(self, bits: int = 4):
        self.bits = bits
        
    def process(self, image: np.ndarray) -> np.ndarray:
        shift = 8 - self.bits
        return ((image >> shift) << shift).astype('uint8')