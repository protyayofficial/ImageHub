import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000/process-image';

export const processImageFromBackend = async (
  file: File, 
  technique: string
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('technique', technique);

  console.log('Processing with technique:', technique);  // Log the selected processor

  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8000'
      : 'https://imagehub-backend-elw9xu92z-protyay-deys-projects.vercel.app';

    const response = await axios.post(
      `${baseUrl}/api/process-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.processed_image;
  } catch (error) {
    console.error('Image processing failed', error);
    throw error;
  }
};
