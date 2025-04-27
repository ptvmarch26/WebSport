import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

const AIChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <div className="fixed bottom-40 lg:bottom-20 right-10 z-50">
        <button
          onClick={toggleChat}
          className="bg-primary hover:opacity-80 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_8px_0_rgba(255,255,255,0.3)] transition-all"
          aria-label="Mở trợ lý AI"
        >
          <FaRobot className="text-xl" />
        </button>
      </div>

      {showChat && <CompactChatBot onClose={toggleChat} />}
    </>
  );
};

const CompactChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "Chào bạn, tôi có thể giúp gì cho bạn hôm nay?",
      sender: "bot",
      timestamp: new Date().toLocaleString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  const { token } = useAuth();
  const { handleGetChatHistory } = useUser();

  useEffect(() => {
    const fetchHistory = async () => {
      if (token) {
        const data = await handleGetChatHistory();
        if (data?.EC === 0 && Array.isArray(data.result)) {
          const formattedMessages = data.result.slice(1).map((msg) => ({
            text: msg.content,
            sender: msg.role === "assistant" ? "bot" : "user",
            timestamp: new Date(msg.timestamp).toLocaleString(),
          }));
          setMessages([
            {
              text: "Chào bạn, tôi có thể giúp gì cho bạn hôm nay?",
              sender: "bot",
              timestamp: new Date().toLocaleString(),
            },
            ...formattedMessages,
          ]);
        }
      } else {
        const savedMessages = localStorage.getItem("chatMessages");
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      }
    };

    fetchHistory();
  }, [token, handleGetChatHistory]);

  // Auto scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lưu localStorage nếu chưa đăng nhập
  useEffect(() => {
    if (!token) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages, token]);

  const handleResetChat = () => {
    setMessages([]);
    if (!token) {
      localStorage.removeItem("chatMessages");
    }
  };

  const URL = import.meta.env.VITE_API_URL;

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      sender: "user",
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${URL}/chat`,
        {
          message: input,
          history: !token
            ? newMessages.map((msg) => ({
                role: msg.sender === "bot" ? "assistant" : "user",
                content: msg.text,
              }))
            : undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const botMessage = {
        text: res.data.result || "Xin lỗi, có lỗi xảy ra!",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Bot gặp lỗi kết nối!",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[56px] lg:bottom-0 right-2 z-[70] bg-white shadow-xl w-80 overflow-hidden border border-gray-200">
      <div className="bg-primary text-white p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaRobot />
          <h3 className="font-medium">Trợ lý AI</h3>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleResetChat}
            className="text-white hover:text-gray-200 text-sm"
          >
            Làm mới
          </button>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="h-72 overflow-y-auto p-3 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${
                message.sender === "user"
                  ? "bg-[#171717] text-white text-right"
                  : "bg-gray-200 text-black"
              }`}
            >
              <div className="text-sm">{message.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">Đang trả lời...</div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-2 border-t">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="w-full bg-gray-100 p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none h-10 text-sm"
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="absolute right-2 top-[22px] transform -translate-y-1/2 text-gray-600 hover:text-black"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatButton;
