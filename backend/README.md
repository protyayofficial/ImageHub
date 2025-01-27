## ImageHub Backend

A FastAPI-based backend service for image processing.

### Technologies Used

- FastAPI
- Python 3.8+
- OpenCV
- Pillow
- NumPy
- Uvicorn

### Project Structure

```
backend/
├── api/
│   └── index.py              # Main FastAPI application
├── image_processors/
│   ├── __init__.py
│   ├── base_processor.py     # Base processor class
│   ├── sketch_processor.py   # Sketch effect processor
│   └── [other processors]    # Other image processors
├── requirements.txt          # Python dependencies
└── vercel.json              # Vercel configuration
```

### Setup and Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start server:

```bash
uvicorn api.index:app --reload
```

### API Endpoints

- `POST /api/process-image`
  - Parameters:
    - `file`: Image file (multipart/form-data)
    - `technique`: Processing technique (string)
  - Returns:
    - `processed_image`: Base64 encoded processed image

### Available Processing Techniques

- `grayscale`: Convert to grayscale
- `brightness`: Adjust brightness
- `contrast`: Modify contrast
- `sharpness`: Enhance sharpness
- `compress`: Compress image
- `sketch`: Convert to pencil sketch

### Deployment

The backend is deployed on Vercel. To deploy:

1. Push to GitHub
2. Connect repository to Vercel
3. Configure Python version
4. Deploy
