# ImageHub - Image Processing Application

## Overview

ImageHub is a modern web application that provides real-time image processing capabilities. Users can upload images and apply various effects including grayscale conversion, brightness adjustment, contrast enhancement, sharpening, compression, and pencil sketch effects.

## Project Structure

```
imagehub/
├── frontend/          # React frontend application
├── backend/           # FastAPI backend service
└── README.md         # Main project documentation
```

## Features

- Multiple image processing effects
- Real-time preview
- User-friendly interface
- Efficient image processing
- Cross-platform compatibility
- Responsive design

## Live Demo

- Frontend: [https://imagehub-rho.vercel.app](https://imagehub-rho.vercel.app)
- Backend API: [https://imagehub-backend.vercel.app](https://imagehub-backend.vercel.app)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/protyayofficial/imagehub.git
cd imagehub
```

2. Start the backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn api.index:app --reload
```

3. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License] - see the [LICENSE](LICENSE) file for details
