<template>
  <div>
    <h2>Chat Component</h2>
    <div class="chat-window flex flex-col justify-between">
      <!-- Chat -->
      <section class="chatSection">
        <div v-for="(message, index) in messages" :key="index" 
          class="chat"
          :class="{'user': message.from === 'user', 'assistant': message.from === 'assistant'}"
        >
          <div class="message-chip" :class="{'user-message': message.from === 'user', 'assistant-message': message.from === 'assistant'}">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ formatDate(message.time) }}</div>
          </div>
        </div>
      </section>
      <section class="input">
        <!-- message-input -->
        <div class="message-input mt-auto">
          <input class="md-input" type="text" placeholder="Escribe un mensaje..." 
            v-model="newMessage" 
            @keyup.enter="sendMessage"
          >
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComponent',
  props: {
    messages: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      model: {
        messages: [],      
      },
      newMessage: ''
    }
  },
  
  methods: {
    sendMessage() {
      if (this.newMessage) {
        const newMessage = {
          text: this.newMessage,
          from: 'user',
          time: Date.now()
        }
        this.model.messages.push(newMessage);
        this.newMessage = '';
        this.$emit('message-sent', newMessage);
      }
    },

    formatDate(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  },

  mounted() {
    this.model.messages = [...this.messages].sort((a, b) => a.time - b.time);
  },
  watch: {
    messages(newMessages) {
      // actualiza los mensajes
      this.model.messages = newMessages.sort((a, b) => a.time - b.time);
    }
  }

}
</script>

<style scoped>
.chat-window {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  height: 400px;
  overflow-y: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 50%;
  margin: 0 auto;
}

.chat {
  padding-bottom: 6px;
}
.user {
  text-align: right;
}

.assistant {
  text-align: left;
}

.message-chip {
  display: inline-block;
  padding: 10px;
  border-radius: 20px;
  background-color: #e1f5fe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  position: relative;
  max-width: 80%;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 5px;
}

.message-time {
  position: absolute;
  bottom: -16px;
  right: 5px;
  font-size: 8px;
  color: #999;
}

.user-message {
  background-color: #dcf8c6;
  color: #333;
  margin-left: auto;
}

.assistant-message {
  background-color: #fff;
  color: #333;
  margin-right: auto;
}

/* Material Design Input */
.md-input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

.md-input:focus {
  border-color: #66afe9;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}

</style>