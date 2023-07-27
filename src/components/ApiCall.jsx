function GetImage(state) {
console.log(state)
    let width = state.width
    let height = state.height

    async function handleAPICall() {
        try {
          let url = "https://picsum.photos"
          const response = await fetch(`https://picsum.photos/${width}/${height}`);
          const data = await response.json();
          console.log('API Response:', data);
          // Perform any other actions with the API response data here.
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return ( 
        data
     );
}

export default GetImage;