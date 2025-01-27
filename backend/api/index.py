from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from image_processors.grayscale_processor import GrayscaleProcessor
from image_processors.brightness_processor import BrightnessProcessor
from image_processors.sharpness_processor import SharpnessProcessor
from image_processors.contrast_processor import ContrastProcessor
from image_processors.compression_processor import CompressionProcessor
from image_processors.sketch_processor import PencilSketch

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://imagehub-rho.vercel.app",  # Your frontend Vercel URL
        "http://localhost:5173",  # Local development URL for Vite
        "http://localhost:8000" 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Processor mapping
PROCESSORS = {
    'grayscale': GrayscaleProcessor(),
    'brightness': BrightnessProcessor(),
    'sharpness': SharpnessProcessor(),
    'contrast': ContrastProcessor(),
    'compress': CompressionProcessor(),
    'sketch': PencilSketch()
}

@app.post("/api/process-image")
async def process_image(file: UploadFile = File(...), technique: str = Form(...)):
    print(f"Received technique: {technique}")  # Log the technique to see if it's received correctly

    # Read image bytes
    image_bytes = await file.read()
    
    # Handle other techniques
    processor = PROCESSORS.get(technique)
    if not processor:
        raise ValueError(f"Unsupported technique: {technique}")
    
    # Decode and process image (now returns NumPy array directly)
    image = processor.decode_image(image_bytes)
    processed_image = processor.process(image)
    
    # Encode processed image
    encoded_image = processor.encode_image(processed_image)
    
    return {"processed_image": f"data:image/png;base64,{encoded_image}"}
