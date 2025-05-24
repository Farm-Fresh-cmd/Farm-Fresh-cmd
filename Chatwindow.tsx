import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X } from "lucide-react";

// Define a simple message type for local state
interface Message {
  id: string;
  text: string;
  sender: "user" | "farmer"; // To differentiate message styling
  timestamp: Date;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  farmerName: string;
  // Later: onSendMessage: (messageText: string) => void;
  // Later: messages: Message[]; 
}

export const ChatWindow: React.FC<Props> = ({
  isOpen,
  onClose,
  farmerName,
}) => {
  const [inputValue, setInputValue] = useState("");
  // Placeholder for messages - will be handled in a later step
  const [messages, setMessages] = useState<Message[]>([]); 
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Dummy function to simulate sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user", // Assume user is sending for now
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md lg:max-w-sm">
      <Card className="flex flex-col h-[60vh] lg:h-[70vh] bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-green-600 text-white">
          <CardTitle className="text-lg font-semibold">Chat with {farmerName}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-green-700">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <ScrollArea className="flex-grow p-4 space-y-3" ref={scrollAreaRef}>
          {/* Message display area - will be implemented in the next step */}
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-10">
              Start the conversation!
            </div>
          )}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[70%] p-2 px-3 rounded-lg text-sm ${ 
                  msg.sender === 'user' 
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
                 <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-200' : 'text-gray-500'} text-right`}>
                   {/* Basic timestamp - can be formatted better later */}
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <CardFooter className="p-4 border-t bg-gray-50">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder={`Message ${farmerName}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow bg-white border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <Button 
              type="button" 
              onClick={handleSendMessage} 
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
