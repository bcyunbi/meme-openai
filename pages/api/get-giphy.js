export async function fetchGiphyApi(keyword) {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=` +
      keyword +
      '&limit=3'
  )
  const data = await res.json()
  return data.data
}
