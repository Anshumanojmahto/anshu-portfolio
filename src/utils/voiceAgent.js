// src/utils/voiceAgent.js

let gameVoice = null;

const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return;

  // Prioritize voices that usually sound more energetic/human
  gameVoice = voices.find(v => v.name.includes("Google US English")) 
           || voices.find(v => v.name.includes("Microsoft Mark"))  // Mark is usually energetic
           || voices.find(v => v.name.includes("Samantha")) 
           || voices.find(v => v.lang === "en-US")
           || voices[0];
};

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices(); 
}

export const speak = (text) => {
  if (!window.speechSynthesis) return;
  
  if (!gameVoice) loadVoices();

  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  if (gameVoice) msg.voice = gameVoice;
  
  // --- EXCITING VOICE SETTINGS ---
  msg.volume = 1;
  msg.rate = 1.15;  // Faster speed (1.0 is boring, 1.2 is energetic)
  msg.pitch = 1.05; // Slightly higher pitch for "brightness"

  window.speechSynthesis.speak(msg);
};