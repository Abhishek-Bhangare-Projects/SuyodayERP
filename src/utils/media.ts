export const getMediaUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  const baseUrl = import.meta.env.VITE_MEDIA_URL || import.meta.env.VITE_API_URL || '';
  return `${baseUrl}/${path.replace(/^\/+/, '')}`;
};

export default getMediaUrl;
