<template>
  <div>
    <SpeechRecognition @transcript-updated="onTranscriptUpdated" />

    <ChatComponent 
      :messages="messages" 
    />
    <!-- <HelloWorld />
    <AeronVoice /> -->
  </div>
</template>

<script>
// import HelloWorld from "@/views/HelloWorld.vue";
// import AeronVoice from "@/views/AeronVoice.vue";
import ChatComponent from "@/views/ChatComponent.vue";
import SpeechRecognition from "@/components/SpeechRecognition.vue";
import SpeechSynthesis from '@/plugins/speechSynthesis.js';
import OpenAiChat from '@/plugins/openai.js';

export default {
  name: "HomeTastic",
  data() {
    return {
      speech: new SpeechSynthesis(window.speechSynthesis.getVoices()[7], 1, 1),
      openai: new OpenAiChat(),
      messages: [
        {
          from: 'user',
          text: 'Hello',
          time: 1623865376
        },
        {
          from: 'user',
          text: 'How are you?',
          time: 1623865382
        },
        {
          from: 'assistant',
          text: 'Hi there!',
          time: 1623865390
        },
        {
          from: 'assistant',
          text: "I'm doing well, thanks. How about you?",
          time: 1623865394
        }
      ]
    }
  },

  methods: {    
    async onTranscriptUpdated(transcript) {
      this.messages.push({
        from: 'user',
        text: transcript,
        time: Date.now()
      })
      let response = await this.openai.generateResponse(transcript);
      console.log(response)
      this.messages.push({
        from: 'assistant',
        text: response.content,
        time: Date.now()
      })
      this.speech.speak(response.content)
    },
  },

  created() {
    // window.speechSynthesis.onvoiceschanged = () => {
    //   this.speech = new SpeechSynthesis(window.speechSynthesis.getVoices()[7], 1, 1.4)
    // }
  },

  components: {
    ChatComponent,
    SpeechRecognition
    // HelloWorld,
    // AeronVoice
  },
}


</script>
