import { useEffect, useState } from 'react'
import { fetchGiphyApi } from './api/get-giphy'

export default function MyPage() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [gifs, setGifs] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    const response = await fetch('/api/get-answer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    })
    const data = await response.json()
    const modifiedText = data.text.replace(/[\n,]+/g, ',')
    const gifs = await fetchGiphyApi(modifiedText)
    setGifs(gifs)
    setAnswer(data.text.trim())
    setIsLoading(false)
  }

  function handleChange(e) {
    setPrompt(e.target.value)
  }

  useEffect(() => {
    // console.log('OPENAI_API_KEY', process.env.GIPHY_API_KEY)
  }, [])
  return (
    <div className='container'>
      <h3>Enter Describe</h3>
      <form className='our-form' onSubmit={handleSubmit}>
        <input className='prompt-field' type='text' onChange={handleChange} />
        <button className='prompt-button'>Find</button>
      </form>

      {isLoading && <div className='loading-spinner'></div>}
      {/* <div className='answer-area'>{answer}</div> */}
      {gifs.length > 0 && (
        <ul>
          {gifs.map((gif) => (
            <li key={gif.id}>
              <img
                src={gif.images.downsized_medium.url}
                alt={gif.id}
                width={100}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
