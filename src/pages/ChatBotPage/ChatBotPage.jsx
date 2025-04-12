import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ChatwithBot } from "../../services/api/UserApi";
import axios from "axios";
const ChatBotPage = () => {


  const [messages, setMessages] = useState([
    {
      text: "Chào bạn, tôi có thể giúp gì cho bạn hôm nay?",
      sender: "bot",
      timestamp: new Date().toLocaleString(),
    },
  ]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);
  
  const handleResetChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatStartTime] = useState(new Date().toLocaleString());
  const endOfMessagesRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/chat", {message: input},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        } 
      );

      const botMessage = {
        text: res.data.reply || "Xin lỗi, có lỗi xảy ra!",
        sender: "bot",
        timestamp: new Date().toLocaleString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Bot gặp lỗi kết nối!",
          sender: "bot",
          timestamp: new Date().toLocaleString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="py-5 bg-[#fefefe]">
      <div className="xl:max-w-[1200px] container mx-auto">
        <div className="px-2">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              Câu chuyện bắt đầu lúc: {chatStartTime}
            </div>

            <div className="min-h-[500px] space-y-5 px-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 space-y-2 rounded-lg w-max ${
                      message.sender === "user"
                        ? "bg-[#171717] text-white text-right"
                        : "bg-[#f6f6f8] text-black"
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className="text-xs text-gray-400">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-sm text-gray-500 italic">Đang trả lời...</div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <div className="relative mt-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="w-full bg-[#f6f6f8] p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none overflow-y-auto"
                placeholder="Nhập tin nhắn..."
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
              >
                <FaArrowRight />
              </button>
            </div>
            <button
              onClick={handleResetChat}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Bắt đầu lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
