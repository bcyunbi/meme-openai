import { useState } from 'react'
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
    setAnswer(data.text.trim())
    const modifiedText = data.text.replace(/[\n,]+/g, ',')
    const gifs = await fetchGiphyApi(modifiedText)
    setGifs(gifs)
    setIsLoading(false)
  }

  function handleChange(e) {
    setPrompt(e.target.value)
  }

  return (
    <div className='container'>
      <div>Enter Describe</div>
      <form className='form' onSubmit={handleSubmit}>
        <input className='prompt-field' type='text' onChange={handleChange} />
        <button className='prompt-button' disabled={isLoading}>
          Find
        </button>
      </form>

      {isLoading && <div className='loading-spinner'></div>}
      <div className='answer-area'>{answer}</div>
      {gifs.length > 0 && (
        <div className='gif-list'>
          {gifs.map((gif) => (
            <div key={gif.id} style={{ width: '200px' }}>
              <img src={gif.images.downsized_medium.url} alt={gif.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
