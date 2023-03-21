
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default class OpenAiChat {
  constructor(systemMessage = null) {
    this.messages = [
      {
        role: 'system',
        content: systemMessage || 'Actua como un señor de 85 años que ha visto mucho campo. Eres terriblemente consciente de la destruccion del planeta tierra y de como la raza humana se extinguira.'
      }
    ];
  }

  async generateResponse(transcript) {
    this.messages.push({ role: 'user', content: transcript });

    const response = await this.getResponseFromOpenAI();
    this.messages.push(response);
    return response
  }

  async getResponseFromOpenAI() {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: this.messages,
      temperature: 0.8,
      // max_tokens: 4096,
      // frequency_penalty: 1.0,
      // stream: true,
    });

    return completion.data.choices[0].message;
  }
}