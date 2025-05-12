import React, { useState } from 'react';
import { Smartphone, Watch, Plus, Bluetooth, RefreshCw, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'watch';
  status: 'connected' | 'disconnected' | 'pairing';
  batteryLevel: number;
  lastSync?: Date;
}

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 14 Pro',
      type: 'phone',
      status: 'connected',
      batteryLevel: 85,
      lastSync: new Date()
    },
    {
      id: '2',
      name: 'Apple Watch Series 8',
      type: 'watch',
      status: 'connected',
      batteryLevel: 62,
      lastSync: new Date()
    }
  ]);

  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const formatLastSync = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - new Date().getTime()) / (1000 * 60)),
      'minutes'
    );
  };

  return (
    <div className="pb-24 sm:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Connected Devices</h1>
        <p className="text-gray-400">Manage your connected devices and sync data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Add New Device</h2>
            <Bluetooth className="text-indigo-400" size={20} />
          </div>

          <div className="text-center py-8">
            <Button
              variant="primary"
              size="lg"
              icon={isScanning ? <RefreshCw className="animate-spin" size={20} /> : <Plus size={20} />}
              onClick={handleStartScan}
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Scan for Devices'}
            </Button>
            {isScanning && (
              <p className="text-gray-400 mt-4">
                Make sure your device is in pairing mode and nearby
              </p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Quick Tips</h2>
            <CheckCircle2 className="text-green-400" size={20} />
          </div>

          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              Enable Bluetooth on your device
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              For smartwatches, open the companion app
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              Keep your device within 30 feet of your computer
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              Ensure your device's battery is above 20%
            </li>
          </ul>
        </Card>
      </div>

      <h2 className="text-lg font-semibold text-white mb-4">Connected Devices</h2>
      <div className="space-y-4">
        {devices.map((device) => (
          <Card key={device.id} className="p-4">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 ${
                device.status === 'connected' ? 'bg-green-500/10' : 'bg-gray-500/10'
              }`}>
                {device.type === 'phone' ? (
                  <Smartphone size={24} className="text-green-400" />
                ) : (
                  <Watch size={24} className="text-green-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-white font-medium">{device.name}</h3>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                    device.status === 'connected' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center mt-1 space-x-4">
                  <p className="text-sm text-gray-400">
                    Battery: {device.batteryLevel}%
                  </p>
                  {device.lastSync && (
                    <p className="text-sm text-gray-400">
                      Last sync: {formatLastSync(device.lastSync)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<RefreshCw size={16} />}
                  onClick={() => {}}
                >
                  Sync
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 size={16} />}
                  onClick={() => {}}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {devices.length === 0 && (
          <Card className="p-8 text-center">
            <XCircle size={40} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No devices connected</p>
            <p className="text-sm text-gray-500 mt-1">
              Click "Scan for Devices" to add a new device
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Devices;