import { useState } from 'react'

export default function MyPage() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    const response = await fetch('/api/get-painting', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    })
    const data = await response.json()
    setAnswer(data.text)
    setIsLoading(false)
  }

  function handleChange(e) {
    setPrompt(e.target.value)
  }

  return (
    <div className='container'>
      <div>Meme Painting!</div>
      <form className='form' disabled={true} onSubmit={handleSubmit}>
        <input className='prompt-field' type='text' onChange={handleChange} />
        <button className='prompt-button' disabled={true}>
          Painting
        </button>
        <button disabled={true}>
          Painting
        </button>
      </form>
      {isLoading ? (
        <div className='loading-spinner'></div>
      ) : (
        <img src={answer} />
      )}
    </div>
  )
}
