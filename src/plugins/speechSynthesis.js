export default class SpeechSynthesis {
  constructor(voice = window.speechSynthesis.getVoices()[7], pitch=1, rate=1) {
    this._synth = window.speechSynthesis;
    this._voice = voice;
    this._pitch = pitch;
    this._rate = rate;

    this.speak = this.speak.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this._voice;
    utterance.pitch = this._pitch;
    utterance.rate = this._rate;
    this._synth.speak(utterance);
  }

  pause() {
    this.synth.pause();
  }

  resume() {
    this.synth.resume();
  }

  cancel() {
    this.synth.cancel();
  }

  set voice(value) {
    this._voice = value;
  }

  set pitch(value) {
    this._pitch = value;
  }

  set rate(value) {
    this._rate = value;
  }
  
}