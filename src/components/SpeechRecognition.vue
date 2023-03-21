<template>
  <div>
    <v-btn @click="toggleRecording">
      {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
    </v-btn>
  </div>
</template>

<script>
import SpeechRecognition from '@/plugins/speechRecognition.js';

export default {
  name: 'SpeechRecognition',
  data: () => ({
    isRecording: false,
  }),
  methods: {
    initialize() {
      this.recognitionUtil = new SpeechRecognition("es-ES");
      this.recognitionUtil.onTranscriptUpdated = this.handleTranscriptUpdated;
    },
    handleTranscriptUpdated(transcript) {
      this.$emit('transcript-updated', transcript);
    },
    toggleRecording() {
      if (!this.isRecording) {
        this.recognitionUtil.start();
        this.isRecording = true;
      } else {
        this.recognitionUtil.stop();
        this.isRecording = false;
      }
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>
