
import { useState } from "react";
import DashboardTile from "./DashboardTile";
import TileDetails from "./TileDetails";
import { Thermometer, Shield, Wifi, Power } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [openTile, setOpenTile] = useState<string | null>(null);

  // Mock data for tiles
  const temperatureData = {
    currentTemp: 72,
    targetTemp: 73,
    status: {
      system: "Running",
      mode: "Cooling",
      filter: "Clean",
      maintenance: "45 days"
    },
    energy: {
      today: "8.2 kWh",
      week: "52.4 kWh"
    }
  };

  const securityData = {
    status: "Armed",
    lastUpdated: "Last updated 15 min ago",
    sensors: [
      { name: "Front Door", active: true },
      { name: "Back Door", active: true },
      { name: "Living Room Window", active: true },
      { name: "Kitchen Window", active: false },
      { name: "Motion Sensor", active: true }
    ]
  };

  const networkData = {
    status: "Connected",
    connectedDevices: 12,
    ssid: "Home_Network",
    speed: "300 Mbps",
    ipAddress: "192.168.1.1",
    devices: [
      { name: "Living Room TV", ip: "192.168.1.10" },
      { name: "Kitchen Speaker", ip: "192.168.1.11" },
      { name: "Bedroom Thermostat", ip: "192.168.1.12" },
      { name: "Front Door Camera", ip: "192.168.1.13" },
      { name: "Smartphone", ip: "192.168.1.14" },
      { name: "Laptop", ip: "192.168.1.15" }
    ]
  };

  const energyData = {
    total: 23.5,
    breakdown: [
      { name: "HVAC", value: 8.2, percentage: 35 },
      { name: "Water Heater", value: 5.4, percentage: 23 },
      { name: "Kitchen", value: 3.8, percentage: 16 },
      { name: "Laundry", value: 2.1, percentage: 9 },
      { name: "Lighting", value: 1.5, percentage: 6 }
    ]
  };

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center text-green-500">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          <span>All systems operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardTile
          title="Temperature"
          icon={<Thermometer className="text-red-500 w-6 h-6" />}
          value={temperatureData.currentTemp}
          unit="°F"
          secondaryValue={`${temperatureData.targetTemp}°F`}
          secondaryLabel="Target"
          backgroundColor="#FFF5F5"
          onClick={() => setOpenTile("temperature")}
        />
        
        <DashboardTile
          title="Security System"
          icon={<Shield className="text-green-500 w-6 h-6" />}
          value={securityData.status}
          backgroundColor="#F2FCE2"
          onClick={() => setOpenTile("security")}
        />
        
        <DashboardTile
          title="Network"
          icon={<Wifi className="text-blue-500 w-6 h-6" />}
          value="Connected"
          secondaryValue="12 devices"
          backgroundColor="#F0F7FF"
          onClick={() => setOpenTile("network")}
        />
        
        <DashboardTile
          title="Energy"
          icon={<Power className="text-purple-500 w-6 h-6" />}
          value={energyData.total}
          unit="kWh"
          secondaryLabel="Today"
          backgroundColor="#F6F1FF"
          onClick={() => setOpenTile("energy")}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Energy Usage Breakdown</h3>
        <div className="space-y-4">
          {energyData.breakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500">{item.value} kWh</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Tile details modals */}
      <TileDetails
        isOpen={openTile === "temperature"}
        onClose={() => setOpenTile(null)}
        title="Temperature"
        data={temperatureData}
        type="temperature"
      />
      
      <TileDetails
        isOpen={openTile === "security"}
        onClose={() => setOpenTile(null)}
        title="Security System"
        data={securityData}
        type="security"
      />
      
      <TileDetails
        isOpen={openTile === "network"}
        onClose={() => setOpenTile(null)}
        title="Network"
        data={networkData}
        type="network"
      />
      
      <TileDetails
        isOpen={openTile === "energy"}
        onClose={() => setOpenTile(null)}
        title="Energy"
        data={energyData}
        type="energy"
      />
    </div>
  );
};

export default Dashboard;
