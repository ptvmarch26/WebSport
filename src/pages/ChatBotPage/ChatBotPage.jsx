import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Chào bạn, tôi có thể giúp gì cho bạn hôm nay?",
      sender: "bot",
      timestamp: new Date().toLocaleString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [chatStartTime] = useState(new Date().toLocaleString());
  const endOfMessagesRef = useRef(null); // ref để tham chiếu phần cuối danh sách tin nhắn

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Bot trả lời: " + input,
            sender: "bot",
            timestamp: new Date().toLocaleString(),
          },
        ]);
      }, 1000);

      setInput("");
    }
  };

  // Đảm bảo lướt xuống cuối danh sách tin nhắn mỗi khi messages thay đổi
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
                    message.sender === "user" ? "justify-end" : "justify-start"
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
              <div ref={endOfMessagesRef} />
            </div>

            <div className="relative mt-4">
            <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="w-full bg-[#f6f6f8] p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none overflow-y-auto"
  placeholder="Nhập tin nhắn..."
/>
              <button
                onClick={handleSendMessage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
