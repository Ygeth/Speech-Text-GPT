import { reactive, readonly } from 'vue';
import axios from 'axios';

const apiKey = '8o1LL9gYUoSRuBbh4RwQT3BlbkFJGJ8U77HzPmUe01RUlnWj';
// const apiUrl = '/engine/davinci-codex/completions';

const state = reactive({
  api: axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  })
});

export default {
  install(app) {
    app.config.globalProperties.$apiOpenAI = readonly(state).api;
  }
};
