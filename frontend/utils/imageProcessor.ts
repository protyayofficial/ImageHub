import axios from 'axios';

export const processImageFromBackend = async (
  file: File, 
  technique: string,
  options: {
    width?: number | string,
    height?: number | string,
    maintainAspectRatio?: boolean | string,
    angle?: number | string,
    intensity?: number,
    radius?: number,
    sigma?: number,
    factor?: number,
    direction?: string,
    h?: number,
    template_window_size?: number,
    search_window_size?: number,
    bits?: number
  }
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('technique', technique);

  // Add all possible parameters, ensuring 0 is handled correctly
  if (options.width !== undefined) formData.append('width', options.width.toString());
  if (options.height !== undefined) formData.append('height', options.height.toString());
  if (options.maintainAspectRatio !== undefined) formData.append('maintain_aspect_ratio', options.maintainAspectRatio.toString());
  if (options.angle !== undefined) formData.append('angle', options.angle.toString());
  if (options.intensity !== undefined) formData.append('intensity', options.intensity.toString());
  if (options.radius !== undefined) formData.append('radius', options.radius.toString());
  if (options.sigma !== undefined) formData.append('sigma', options.sigma.toString());
  if (options.factor !== undefined) formData.append('factor', options.factor.toString());
  if (options.direction) formData.append('direction', options.direction);
  if (options.h !== undefined) formData.append('h', options.h.toString());
  if (options.template_window_size !== undefined) formData.append('template_window_size', options.template_window_size.toString());
  if (options.search_window_size !== undefined) formData.append('search_window_size', options.search_window_size.toString());
  if (options.bits !== undefined) formData.append('bits', options.bits.toString());

  console.log('Processing with technique:', technique);

  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8000'
      : 'https://imagehub-backend.vercel.app'; // Your actual backend URL

    const response = await axios.post(
      `${baseUrl}/api/process-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
      }
    );
    return response.data.processed_image;
  } catch (error) {
    console.error('Image processing failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }
    throw error;
  }
};
