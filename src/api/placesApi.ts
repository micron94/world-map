


export const getCountryPlaceInfo = async (country: String)=>{ 

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.photos'
      },
      body: JSON.stringify({
        textQuery: `Top things to do in ${country}`
      }) 
    }); 
  
    if (!response.ok) {
      console.log(Error(`Error: ${response.statusText}`));
    }
    const data = await response.json();
    return data;
  }


  const getCountryPhotos = async (places: Object[]) => { 




  }


  const getPlacePhotos = async (place) => {




  }