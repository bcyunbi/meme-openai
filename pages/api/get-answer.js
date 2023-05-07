const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (typeof req.body.prompt === 'string') {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Extract keywords from this text: ${req.body.prompt}`,
      temperature: 0.06,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
    })
    res.status(200).json({ text: response.data.choices[0].text.trim() })
  } else {
    res.status(200).json({ text: 'Invalid prompt provided.' })
  }
}
