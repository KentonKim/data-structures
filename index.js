const img = document.querySelector('img')
const keyinput = document.querySelector('#key') 
const gifinput = document.querySelector('#gif') 
const form = document.querySelector('#form')
const span = document.querySelector('span')

class CustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = 'CustomError';
    this.errorCode = errorCode;
  }
}

// use of .then.catch
// function fetchData(search, key) {
//   const string = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${search}`
//   return fetch(string, {mode: 'cors'})
//     .then((response) => {
//       if (!response.ok) {
//         throw new CustomError('Network response was not ok', 0)
//       }
//       return response.json()
//     })
//     .then((response) => {
//       if (!response.hasOwnProperty('data') || response.data.length == 0) {
//         throw new CustomError('Not found', 1)
//       }
//       return response.data.images.original.url
//     })
// }

// form.addEventListener('submit', (event) => {
//   event.preventDefault()
//   const apikey = keyinput.value
//   const search = gifinput.value
//   fetchData(search, apikey).then((response) => {
//     img.src = response 
//     span.textContent = `A gif of ${search}` 
//   }).catch((err) => {
//     console.log(err)
//     if (err.errorCode === 1) {
//       console.log(err)
//       fetchData('Not found', apikey)
//         .then((response) => {
//           img.src = response
//           span.textContent = "Gif not found!"
//         })
//     }
//     else if (err.errorCode == 0) {
//       span.textContent = "Request unsuccessful. Double check your API Key!"
//     }
//   })
// })

// use of async and await
async function fetchData(search, key) {
  const string = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${search}`
  try {
    const response = await fetch(string, {mode: 'cors'})
    const imgData = await response.json();
    console.log(imgData)
    if (!imgData.hasOwnProperty('data') || imgData.data.length == 0) {
      throw new CustomError('Not found', 1)
    }
    return imgData.data.images.original.url
  } catch (error) {
    console.log(error)
    return error
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const apikey = keyinput.value
  const search = gifinput.value
  try {
    const imgLink = await fetchData(search, apikey)
    if (imgLink instanceof CustomError) {
      throw imgLink
    }
    img.src = imgLink 
    span.textContent = `A gif of ${search}` 
  } catch(err) {
    console.log(err)
    if (err instanceof CustomError) {
      const errImgLink = await fetchData('Not found', apikey)
      img.src = errImgLink 
      span.textContent = "Gif not found!"
    }
    else {
      span.textContent = "Request unsuccessful. Double check your API Key!"
    }
  }
})