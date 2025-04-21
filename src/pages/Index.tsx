
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="flex-grow overflow-y-auto p-4">
          <Dashboard />
        </div>
        <div className="w-full lg:w-[400px] lg:min-h-[calc(100vh-80px)] p-4 border-l border-gray-200">
          <ChatAssistant />
        </div>
      </div>
    </div>
  );
};

export default Index;
