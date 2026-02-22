// ================== SHRI JI AGRITECH SMART AI CHATBOT ==================

const chatToggle = document.getElementById("chatToggle");
const chatbox = document.getElementById("chatbox");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

let context = null;
let assistCount = 0;
let contactGiven = false;
let greeted = false;

// ================= UI CONTROLS =================

chatToggle.onclick = () => chatbox.style.display = "flex";
closeChat.onclick = () => chatbox.style.display = "none";
sendBtn.onclick = sendMessage;

chatInput.addEventListener("keypress", function(e){
  if(e.key === "Enter") sendMessage();
});

function sendMessage(){
  const message = chatInput.value.trim();
  if(message === "") return;

  appendMessage(message, "user-message");
  chatInput.value = "";
  scrollToBottom();
  showTyping();

  setTimeout(() => {
    removeTyping();
    const reply = getBotReply(message);
    appendMessage(reply, "bot-message");
    scrollToBottom();
  }, 600);
}

function appendMessage(text, className){
  const msg = document.createElement("div");
  msg.classList.add(className);
  msg.innerText = text;
  chatBody.appendChild(msg);
}

function scrollToBottom(){
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping(){
  const typing = document.createElement("div");
  typing.classList.add("bot-message");
  typing.id = "typing";
  typing.innerText = "Typing...";
  chatBody.appendChild(typing);
}

function removeTyping(){
  const typing = document.getElementById("typing");
  if(typing) typing.remove();
}

// ================= SMART SYSTEM =================

function normalize(text){
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

function matchKeywords(msg, keywords){
  return keywords.some(keyword => msg.includes(keyword));
}

function increaseAssist(){
  assistCount++;

  if(assistCount >= 6 && !contactGiven){
    contactGiven = true;
    return true;
  }
  return false;
}

// ================= MAIN AI FUNCTION =================

function getBotReply(message){

  const msg = normalize(message);
  const words = msg.split(" ");

  // GREETING (Exact word match only)
  if(!greeted && (
      words.includes("hi") ||
      words.includes("hello") ||
      words.includes("helo") ||
      words.includes("hii") ||
      words.includes("namaste") ||
      words.includes("hey")
  )){
      greeted = true;
      return "Namaste 🙏 Welcome to Shri Ji AgriTech 🌾 How can I assist you today?";
  }

  // THANK YOU
  if(matchKeywords(msg, ["thank","thanks","thnx","thankyou"])){
      return "You're most welcome 🙌 Happy Farming 🌱";
  }

  // PRICE
  if(matchKeywords(msg, ["price","prize","prise","pricing","rate","cost","kitna","daam"])){
      if(increaseAssist()){
          return contactMessage();
      }
      context = "pricing";
      return "Sure 👍 Please tell me product name and quantity.";
  }

  if(context === "pricing"){
      context = null;
      if(increaseAssist()){
          return contactMessage();
      }
      return `For "${message}" pricing 📊 please contact us for exact quotation.`;
  }

  // DELIVERY
  if(matchKeywords(msg, ["delivery","deliver","ship","shipping","location","locatn"])){
      if(increaseAssist()){
          return contactMessage();
      }
      context = "delivery";
      return "Please share your district 📍 to confirm delivery availability.";
  }

  if(context === "delivery"){
      context = null;
      if(increaseAssist()){
          return contactMessage();
      }
      return `Yes ✅ We deliver to ${message}. For delivery charges please contact us directly.`;
  }

  // PRODUCTS

  if(matchKeywords(msg, ["drip","irrigation"])){
      if(increaseAssist()) return contactMessage();
      return "💧 Drip Irrigation System saves up to 50% water and increases crop yield.";
  }

  if(matchKeywords(msg, ["hdpe","hdpee","lapeta","pipe"])){
      if(increaseAssist()) return contactMessage();
      return "🟢 We provide premium HDPE Lapeta Pipes for irrigation.";
  }

  if(matchKeywords(msg, ["mulch","malch","mulching"])){
      if(increaseAssist()) return contactMessage();
      return "🌱 Mulch Paper helps in weed control and moisture retention.";
  }

  if(matchKeywords(msg, ["sprinkler","sprinkl"])){
      if(increaseAssist()) return contactMessage();
      return "💦 Mini Sprinkler ensures uniform water distribution.";
  }

  if(matchKeywords(msg, ["weed","weedmat"])){
      if(increaseAssist()) return contactMessage();
      return "🌾 Weed Mat prevents unwanted grass growth and reduces labour cost.";
  }

  if(matchKeywords(msg, ["tirpal","tarpaulin"])){
      if(increaseAssist()) return contactMessage();
      return "🛡 Agricultural Tirpal protects crops from rain and sunlight.";
  }

  // ORDER
  if(matchKeywords(msg, ["order","buy","purchase","khareed","book"])){
      if(increaseAssist()) return contactMessage();
      return "🛒 You can place your order using the order form on this page.";
  }

  // CONTACT
  if(matchKeywords(msg, ["contact","number","call","phone","mobile"])){
      return contactMessage();
  }

  // LOCATION
  if(matchKeywords(msg, ["address","where"])){
      if(increaseAssist()) return contactMessage();
      return "📍 We are located in Basantapur, Shahjahanpur, Uttar Pradesh.";
  }

  // DEFAULT
  if(increaseAssist()){
      return contactMessage();
  }

  return "🌾 I am Shri Ji AgriTech Smart Assistant. Ask about products, pricing, delivery, irrigation solutions.";
}

// ================= CONTACT MESSAGE =================

function contactMessage(){
  return "📞 For detailed assistance and best pricing, please contact us directly:\n\nCall / WhatsApp: +91 9452595862\n📍 Basantapur, Shahjahanpur, Uttar Pradesh";
}