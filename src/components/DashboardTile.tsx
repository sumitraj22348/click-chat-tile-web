
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardTileProps {
  title: string;
  icon: ReactNode;
  value: string | number;
  unit?: string;
  secondaryValue?: string;
  secondaryLabel?: string;
  backgroundColor: string;
  onClick: () => void;
}

const DashboardTile = ({
  title,
  icon,
  value,
  unit,
  secondaryValue,
  secondaryLabel,
  backgroundColor,
  onClick,
}: DashboardTileProps) => {
  return (
    <div
      className="p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="p-3 rounded-lg mr-3">{icon}</div>
        <div className="flex-grow">
          <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">{value}</span>
              {unit && <span className="ml-1 text-2xl text-gray-700">{unit}</span>}
            </div>
            {secondaryValue && secondaryLabel && (
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">{secondaryLabel}:</span>
                <span className="text-md text-gray-700">{secondaryValue}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTile;
