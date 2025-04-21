
import { Home, Settings, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
          <Home className="text-white w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Smart Home Manager</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Moon className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
