from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from image_processors.grayscale_processor import GrayscaleProcessor
from image_processors.brightness_processor import BrightnessProcessor
from image_processors.sharpness_processor import SharpnessProcessor
from image_processors.contrast_processor import ContrastProcessor
from image_processors.compression_processor import CompressionProcessor
from image_processors.sketch_processor import PencilSketch
from image_processors.resize_processor import ResizeProcessor
from image_processors.rotate_processor import RotateProcessor
from image_processors.gaussian_blur_processor import GaussianBlurProcessor
from image_processors.sepia_processor import SepiaProcessor
from image_processors.flip_processor import FlipProcessor
from image_processors.saturation_processor import SaturationProcessor
from image_processors.invert_processor import InvertProcessor
from image_processors.denoise_processor import DenoiseProcessor
from image_processors.cartoonize_processor import CartoonizeProcessor
from image_processors.posterize_processor import PosterizeProcessor

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Processor mapping (class references)
PROCESSORS = {
    'grayscale': GrayscaleProcessor,
    'brightness': BrightnessProcessor,
    'sharpness': SharpnessProcessor,
    'contrast': ContrastProcessor,
    'compress': CompressionProcessor,
    'sketch': PencilSketch,
    'resize': ResizeProcessor,
    'rotate': RotateProcessor,
    'gaussianblur': GaussianBlurProcessor,
    'sepia': SepiaProcessor,
    'flip': FlipProcessor,
    'sketch': PencilSketch,
    'saturation': SaturationProcessor,
    'invert': InvertProcessor,
    'denoise': DenoiseProcessor,
    'cartoonize': CartoonizeProcessor,
    'posterize': PosterizeProcessor,
}

@app.post("/api/process-image")
async def process_image(
    file: UploadFile = File(...),
    technique: str = Form(...),
    # Resize parameters
    width: int = Form(None),
    height: int = Form(None),
    maintain_aspect_ratio: bool = Form(True),
    # Rotation parameters
    angle: float = Form(0.0),
    # Common parameters
    intensity: float = Form(None),
    radius: int = Form(None),
    sigma: float = Form(None),
    factor: float = Form(None),
    direction: str = Form(None),
    h: float = Form(None),
    template_window_size: int = Form(None),
    search_window_size: int = Form(None),
    bits: int = Form(None)
):
    # Initialize processor based on technique
    processor = None
    
    if technique == 'resize':
        processor = ResizeProcessor(
            width=width,
            height=height,
            maintain_aspect_ratio=maintain_aspect_ratio
        )
    elif technique == 'rotate':
        processor = RotateProcessor(angle=angle)
    elif technique == 'gaussianblur':
        processor = GaussianBlurProcessor(radius=radius, sigma=sigma)
    elif technique == 'sepia':
        processor = SepiaProcessor(intensity=intensity)
    elif technique == 'flip':
        processor = FlipProcessor(direction=direction)
    elif technique == 'brightness':
        processor = BrightnessProcessor(factor=factor)
    elif technique == 'contrast':
        processor = ContrastProcessor(factor=factor)
    elif technique == 'sharpness':
        processor = SharpnessProcessor(intensity=intensity)
    elif technique == 'saturation':
        processor = SaturationProcessor(factor=factor)
    elif technique == 'invert':
        processor = InvertProcessor()
    elif technique == 'denoise':
        processor = DenoiseProcessor(
            h=h if h else 10.0,
            template_window_size=template_window_size if template_window_size else 7,
            search_window_size=search_window_size if search_window_size else 21
        )
    elif technique == 'cartoonize':
        processor = CartoonizeProcessor()
    elif technique == 'posterize':
        processor = PosterizeProcessor(bits=bits if bits else 4)
    else:
        # For processors that don't require parameters
        processor_class = PROCESSORS.get(technique)
        if not processor_class:
            raise ValueError(f"Unsupported technique: {technique}")
        processor = processor_class()

    # Read and process image
    image_bytes = await file.read()
    image = processor.decode_image(image_bytes)
    processed_image = processor.process(image)
    encoded_image = processor.encode_image(processed_image)
    
    return {"processed_image": f"data:image/png;base64,{encoded_image}"}