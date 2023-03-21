export default class SpeechRecognition {
  constructor(lang = 'es-ES') {
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = lang;
    this.transcript = '';

    this.recognition.onstart = () => {
      this.isRecording = true;
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i][0];

        if (event.results[i].isFinal) {
          this.transcript += result.transcript.trim() + ' ';
          this.onTranscriptUpdated(this.transcript);
          this.recognition.stop();
        }
      }
    };
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  onTranscriptUpdated(callback) {
    this.onTranscriptUpdated = callback;
  }
}