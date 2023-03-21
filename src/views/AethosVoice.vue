<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1 class="text-h2 font-weight-bold">AethosVoice</h1>

      <div class="transcript">
        {{ transcript }}
      </div>


      <div class="response">
        <h2> ChatGpt Voice </h2>
        {{ response }}
      </div>
    </v-responsive>
  </v-container>
</template>

<script>
// const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

import { Configuration, OpenAIApi } from 'openai';
// import { speakResponse } from '@/utils/speechSynthesis';
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


export default {
  name: "AethosVoice",
  data: () => ({
    model: {
      synth: {
        selectedVoice: null,
      },
    },
    synth: window.speechSynthesis,
    response: null,
    messages: [
      {role: "system", content: "Eres una AI reconocida como cientifico ambiental. Eres terriblemente consciente del futuro del planeta tierra y de como la raza humana se extinguira."},
    ],
    //
  }),
  methods: {
    onTranscriptUpdated(transcript) {
      this.transcript = transcript;
      console.log(this.transcript)
      this.generateOpenAIResponse(transcript);
    },

    async generateOpenAIResponse(transcript) {
      this.messages.push({role: "user", content: transcript})
      const response = await this.getResponseFromOpenAI();
      this.messages.push(response)
      this.response = response.content;

      this.speakResponse(response.content, this.model.synth.selectedVoice);
    },

    
    //#region OpenAI
    async getResponseFromOpenAI() {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: this.messages,
        // max_tokens: 4096,
        temperature: 0.8,
        // frequency_penalty: 1.0,
        // stream: true,
      });
      return completion.data.choices[0].message
    },

    //#endregion OpenAI

    //#region Speech Synthesis
    speakResponse(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.model.synth.selectedVoice;
      utterance.pitch = 1;
      utterance.rate = 1.15;
      
      this.synth.speak(utterance);
    },
    //#endregion Speech Synthesis

    //#region Speech Recognition
    /** Speech Recognition */    
    initializeSpeechRecognition(){
      // Config
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;

      // Events
      this.speechRecognition.onstart = () => this.isRecording = true;
      this.speechRecognition.onend = () => this.isRecording = false;
      this.speechRecognition.onresult= (e) => this.onResultSpeechRecognition(e);
    },

    /**  @param {SpeechRecognitionEvent} recognition
     *   @returns {void}
     *   @description Evento que se ejecuta cuando se detecta un resultado de la voz y guarda el texto en this.transcript
    */
    onResultSpeechRecognition (recognition) {
        for (let i = 0; i< recognition.results.length; i++){
          const result = recognition.results[i];
          if(result.isFinal) {
            if(this.checkVoiceCommand(result[0].transcript)){  
              this.transcript = result[0].transcript;
              this.stopRecord();
              this.generateOpenAIResponse(result[0].transcript);
            }
          } 
        }

        // Get the transcript
        const aux = Array.from(recognition.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.transcript = aux;
    },
    //#endregion Speech Recognition

    // Check if user said any Voice Command
    checkVoiceCommand(transcript){      
      if(transcript.toLowerCase().includes("callate")){
        this.synth.pause();
        return false;
      }
      if(transcript.includes("deja de grabar")){
        this.speechRecognition.stop();
        this.response = "He parado de grabar"
      }
      return true;
    },

  },

  mounted(){
    this.initializeSpeechRecognition();
    this.speechRecognition.start();
  },
  created(){
    if ('speechSynthesis' in window) {
      console.log("speechSynthesis")
      this.model.synth.selectedVoice = this.synth.getVoices()[7]
    }

    // Configure synth Utterance
    // this.speakResponse("Hola, soy Aeron, tu asistente virtual. ¿Desea algo? Puede pedirme ayuda si no sabe que decir.")
  }
};
//
</script>
