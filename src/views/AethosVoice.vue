<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">AeronVoice</h1>

      <div class="py-14">
        <v-icon
          class="cursor-pointer"
          size="5rem"
          @click="toggleMic()"
        >
          mdi-microphone
        </v-icon>
      </div>
      <v-btn @click="toggleSpeech()">Callate</v-btn>
      <v-btn @click="startRecord()" color="">Record</v-btn>
      <v-btn @click="stopRecord()" color="">Stop</v-btn>

      <div class="transcript">
        {{ transcript }}
      </div>


      <div class="response">
        <h2> OpenAI </h2>
        {{ response }}
      </div>

      <!-- Cols centered x3 -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto"> </v-col>
        <v-col cols="auto"> </v-col>
        <v-col cols="auto"> </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const synth= window.speechSynthesis;

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default {
  name: "AeronVoice",
  data: () => ({
    record: null,
    transcript: null,
    isRecording: false,
    speechRecognition: new Recognition(),
    synth: window.speechSynthesis,
    response: null,
    messages: [{role: "system", content: "Contesta hablando de usted, pide ayuda si no sabes que decir."},
      {role: "user", content: "You are sarcastic AI but helpful, ask for help if you don't know what to say."}],
    //
  }),
  methods: {
    startRecord() {
      console.log(this.isRecording)
      if(!this.isRecording){
        this.speechRecognition.start();
      }
    },
    stopRecord() {
      if(this.isRecording){
        this.speechRecognition.stop();
      }
    },

    toggleSpeech(){
      this.synth.paused ? this.synth.resume() : this.synth.pause();
    },

    toggleMic(){
      this.isRecording ? this.speechRecognition.stop() : this.speechRecognition.start();
    },

    async generateOpenAIResponse(transcript) {
      this.messages.push({role: "user", content: transcript})
      const response = await this.getResponseFromOpenAI();
      this.messages.push(response)
      this.response = response.content;

      this.speakResponse(response.content);
    },

    
    //#region OpenAI
    async getResponseFromOpenAI() {
      //  await this.createCompletion()

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
      utterance.voice=this.synth.getVoices()[7];
      utterance.pitch = 1.4;
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
      this.speechRecognition.onstart = () => {
        console.log("Record Started");
        this.isRecording = true;
      };
      this.speechRecognition.onend = () => {
        console.log("Record Stopped");
        this.isRecording = false;
      };

      this.speechRecognition.onresult= (e) => this.onResultSpeechRecognition(e);
      // {
      //   for (let i = 0; i< e.results.length; i++){
      //     const result = e.results[i];
      //     if(result.isFinal) this.checkVoiceCommand(result[0].transcript);
      //   }

      //   // Get the transcript
      //   const aux = Array.from(e.results)
      //     .map((result) => result[0])
      //     .map((result) => result.transcript)
      //     .join("");


      //   this.transcript = aux;
      // };
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
    // this.speakResponse("Hola, soy Aeron, tu asistente virtual. ¿Desea algo? Puede pedirme ayuda si no sabe que decir.")
  }
};
//
</script>
