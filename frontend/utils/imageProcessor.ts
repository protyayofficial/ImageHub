import axios from 'axios';

export const processImageFromBackend = async (
  file: File, 
  technique: string
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('technique', technique);

  console.log('Processing with technique:', technique);

  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8000'
      : 'https://imagehub-backend.vercel.app'; // Your actual backend URL

    // Remove trailing slash from baseUrl and ensure correct path
    const response = await axios.post(
      `${baseUrl}/api/process-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Add CORS settings
        withCredentials: false,
      }
    );
    return response.data.processed_image;
  } catch (error) {
    console.error('Image processing failed:', error);
    if (axios.isAxiosError(error)) {
      // More detailed error logging
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }
    throw error;
  }
};