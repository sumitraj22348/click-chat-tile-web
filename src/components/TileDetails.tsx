
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TileDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  type: "temperature" | "security" | "network" | "energy";
}

const TileDetails = ({ isOpen, onClose, title, data, type }: TileDetailsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {type === "temperature" && (
            <div>
              <div className="text-5xl font-bold text-center my-6">
                {data.currentTemp}°F
              </div>
              <div className="flex justify-center gap-2 mb-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white"
                >
                  <ChevronUp className="h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white"
                >
                  <ChevronDown className="h-6 w-6" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">HVAC Status</h3>
                  <div className="grid grid-cols-2 gap-y-2 mt-2">
                    <div className="text-gray-500">System:</div>
                    <div>{data.status.system}</div>
                    <div className="text-gray-500">Mode:</div>
                    <div>{data.status.mode}</div>
                    <div className="text-gray-500">Filter:</div>
                    <div>{data.status.filter}</div>
                    <div className="text-gray-500">Next maintenance:</div>
                    <div>{data.status.maintenance}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mt-4">Energy Usage</h3>
                  <div className="grid grid-cols-2 gap-y-2 mt-2">
                    <div className="text-gray-500">Today:</div>
                    <div>{data.energy.today}</div>
                    <div className="text-gray-500">This Week:</div>
                    <div>{data.energy.week}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {type === "security" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl font-bold mb-2">{data.status}</div>
                <p className="text-gray-500">{data.lastUpdated}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Sensors</h3>
                {data.sensors.map((sensor: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{sensor.name}</span>
                    <span className={sensor.active ? "text-green-500" : "text-red-500"}>
                      {sensor.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button className="w-full" variant={data.status === "Armed" ? "destructive" : "default"}>
                  {data.status === "Armed" ? "Disarm System" : "Arm System"}
                </Button>
              </div>
            </div>
          )}
          
          {type === "network" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold">{data.status}</div>
                <p className="text-gray-500">{data.connectedDevices} devices connected</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Network Details</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="text-gray-500">SSID:</div>
                  <div>{data.ssid}</div>
                  <div className="text-gray-500">Speed:</div>
                  <div>{data.speed}</div>
                  <div className="text-gray-500">IP Address:</div>
                  <div>{data.ipAddress}</div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Connected Devices</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {data.devices.map((device: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{device.name}</span>
                      <span className="text-gray-500">{device.ip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {type === "energy" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold">{data.total} kWh</div>
                <p className="text-gray-500">Today's Usage</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Breakdown</h3>
                <div className="space-y-4">
                  {data.breakdown.map((item: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span>{item.value} kWh</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TileDetails;
