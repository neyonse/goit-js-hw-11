const BASE_URL = 'https://pixabay.com/api/';
const MY_API_KEY = '37383891-385c0c3fa5b4b213da48ba87c';

export function fetchImages(inputData) {
  const q = inputData.split(' ').join('+');
  console.log(q);

  const options = {
    key: MY_API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  console.log(options);

  //   const formattedOptions = JSON.stringify(options);
  //   console.log(formattedOptions);

  //   console.log(formattedOptions.split(':').join('=').split(',').join('&'));

  //   const url = `${BASE_URL}?${formattedOptions}`;
  //   console.log(url);

  //   fetch(url)
  //     .then(r => r.json())
  //     .then(data => console.log(data));
  //
}
