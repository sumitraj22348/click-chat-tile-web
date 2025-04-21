
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Smart Home Assistant. I can help you control your home's temperature, lights, security system, and monitor energy usage. What would you like to do?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem("openai_api_key") || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(!localStorage.getItem("openai_api_key"));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast.error("Please enter your OpenAI API key first");
      return;
    }

    // Add user message to chat
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful smart home assistant that can control temperature, security systems, lights, and monitor energy usage. Provide brief and helpful responses about home automation."
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.choices[0].message.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      toast.error("Failed to get response from assistant. Please check your API key.");
      
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I'm having trouble connecting. Please check your API key or try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem("openai_api_key", apiKey);
    setShowApiKeyInput(false);
    toast.success("API key saved successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <MessageSquare className="text-white w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Smart Assistant</h2>
        </div>
        <p className="text-gray-500 mt-1">Always here to help</p>
      </div>

      {showApiKeyInput ? (
        <div className="p-4 flex flex-col gap-2">
          <p className="text-sm text-gray-700">
            Please enter your OpenAI API key to use the chat assistant:
          </p>
          <Input 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="mb-2"
          />
          <Button onClick={saveApiKey} disabled={!apiKey}>
            Save API Key
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.role === "user" 
                    ? "ml-auto bg-blue-500 text-white" 
                    : "mr-auto bg-gray-100 text-gray-900"
                } max-w-[80%] rounded-lg p-3`}
              >
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()} 
                className="bg-blue-500 hover:bg-blue-600 rounded-full"
              >
                <SendIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatAssistant;
