



export const searchImages = async (query, page = 1, perPage = 10) => {
    const accessKey = import.meta.env.VITE_UNSPLASH_KEY;
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}`;
  
    try { 
      const response = await fetch(url, { 
        headers: {
          'Authorization': `Client-ID ${accessKey}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.results; // Array of images
    } catch (error) {
      console.error('Error fetching images:', error);
      return null;
    }
  };