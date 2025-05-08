import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { toast, Toaster } from 'react-hot-toast';
import {
  Car,
  Calendar,
  ClipboardList,
  FileText,
  Menu,
  X,
  Plus,
  Settings,
  LogOut,
  Search,
  Moon,
  Sun,
  Download,
  Mail
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type Vehicle = {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: 'active' | 'maintenance' | 'retired';
  lastService: string;
};

type Appointment = {
  id: string;
  vehicleId: string;
  date: string;
  type: 'maintenance' | 'repair' | 'inspection';
  status: 'scheduled' | 'in-progress' | 'completed';
  notes: string;
};

type ServiceType = {
  type: string;
  count: number;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('fleet');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMake, setFilterMake] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  
  const demoVehicles: Vehicle[] = [
    {
      id: '1',
      vin: '1HGCM82633A123456',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      status: 'active',
      lastService: '2024-02-15'
    },
    {
      id: '2',
      vin: '2FMDK3GC3BB234567',
      make: 'Ford',
      model: 'F-150',
      year: 2022,
      status: 'maintenance',
      lastService: '2024-03-01'
    }
  ];

  const demoAppointments: Appointment[] = [
    {
      id: '1',
      vehicleId: '1',
      date: '2024-03-20',
      type: 'maintenance',
      status: 'scheduled',
      notes: 'Regular maintenance check'
    },
    {
      id: '2',
      vehicleId: '2',
      date: '2024-03-15',
      type: 'repair',
      status: 'in-progress',
      notes: 'Brake system repair'
    }
  ];

  const serviceData = {
    labels: ['Oil Change', 'Tire Rotation', 'Brake Service', 'Inspection'],
    datasets: [{
      data: [30, 25, 20, 25],
      backgroundColor: ['#60A5FA', '#34D399', '#F87171', '#FBBF24'],
    }]
  };

  const completedServicesData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [{
      label: 'Completed Services',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
      borderColor: '#60A5FA',
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Services: ${context.raw}`;
          }
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDarkMode ? '#fff' : '#000'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#000'
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#000'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${percentage}%`;
          }
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDarkMode ? '#fff' : '#000'
        },
        onClick: (e: any, legendItem: any) => {
          const index = legendItem.index;
          setSelectedServiceType(selectedServiceType === serviceData.labels[index] ? null : serviceData.labels[index]);
        }
      }
    }
  };

  useEffect(() => {
    // Simulate real-time notifications
    const timer = setInterval(() => {
      const random = Math.random();
      if (random > 0.8) {
        toast.success('New appointment scheduled');
      } else if (random > 0.6) {
        toast.success('Service completed');
      }
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const filteredVehicles = demoVehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMake = !filterMake || vehicle.make === filterMake;
    const matchesYear = !filterYear || vehicle.year.toString() === filterYear;
    const matchesStatus = !filterStatus || vehicle.status === filterStatus;

    return matchesSearch && matchesMake && matchesYear && matchesStatus;
  });

  const pendingAppointments = demoAppointments.filter(a => a.status === 'scheduled').length;
  const overdueServices = 2; // Demo value

  const handleExport = () => {
    toast.success('Exporting data...');
  };

  const handleGenerateReport = () => {
    toast.success('Generating monthly report...');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex`}>
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className={`font-bold text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} ${!isSidebarOpen && 'hidden'}`}>FleetManager</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 pt-4">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`w-full p-4 flex items-center gap-3 ${
              activeTab === 'fleet' 
                ? isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } relative`}
          >
            {activeTab === 'fleet' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            )}
            <Car size={20} />
            {isSidebarOpen && <span>Fleet</span>}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`w-full p-4 flex items-center gap-3 ${
              activeTab === 'schedule'
                ? isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } relative`}
          >
            {activeTab === 'schedule' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            )}
            <Calendar size={20} />
            {isSidebarOpen && <span>Schedule</span>}
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`w-full p-4 flex items-center gap-3 ${
              activeTab === 'service'
                ? isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } relative`}
          >
            {activeTab === 'service' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            )}
            <ClipboardList size={20} />
            {isSidebarOpen && <span>Service History</span>}
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`w-full p-4 flex items-center gap-3 ${
              activeTab === 'invoices'
                ? isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } relative`}
          >
            {activeTab === 'invoices' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
            )}
            <FileText size={20} />
            {isSidebarOpen && <span>Invoices</span>}
          </button>
        </nav>

        <div className="border-t p-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full p-2 flex items-center gap-3 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } rounded-lg mb-2`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            {isSidebarOpen && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button className={`w-full p-2 flex items-center gap-3 ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
          } rounded-lg`}>
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
          <button className={`w-full p-2 flex items-center gap-3 ${
            isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-50 text-red-600'
          } rounded-lg`}>
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Global Search */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by VIN, make, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } border`}
            />
          </div>
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            <Mail size={20} />
            Generate Report
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Download size={20} />
            Export Data
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Total Vehicles</h3>
            <p className="text-3xl font-bold text-blue-600">{demoVehicles.length}</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Pending Appointments</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingAppointments}</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Overdue Services</h3>
            <p className="text-3xl font-bold text-red-600">{overdueServices}</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Completed Services</h3>
            <p className="text-3xl font-bold text-green-600">
              {demoAppointments.filter(a => a.status === 'completed').length}
            </p>
          </div>
        </div>

        {activeTab === 'fleet' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Vehicle Fleet</h2>
              <div className="flex gap-4">
                <select
                  value={filterMake}
                  onChange={(e) => setFilterMake(e.target.value)}
                  className={`rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <option value="">All Makes</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Ford">Ford</option>
                </select>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className={`rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <option value="">All Years</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                  <Plus size={20} />
                  Add Vehicle
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map(vehicle => (
                <div key={vehicle.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{vehicle.year}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>VIN: {vehicle.vin}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Service: {vehicle.lastService}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <button className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h3 className="text-xl font-semibold mb-4">Completed Services (30 Days)</h3>
                <Line data={completedServicesData} options={chartOptions} />
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
                <h3 className="text-xl font-semibold mb-4">Service Type Distribution</h3>
                <Pie data={serviceData} options={pieChartOptions} />
                {selectedServiceType && (
                  <p className="text-center mt-4">
                    Selected: {selectedServiceType}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Service Schedule</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Plus size={20} />
                Schedule Service
              </button>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              {demoAppointments.map(appointment => (
                <div key={appointment.id} className="border-b last:border-b-0 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {demoVehicles.find(v => v.id === appointment.vehicleId)?.make} 
                        {' '}
                        {demoVehicles.find(v => v.id === appointment.vehicleId)?.model}
                      </h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{appointment.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {appointment.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{appointment.notes}</p>
                  <div className="mt-4 flex justify-end gap-4">
                    <button className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}>
                      Reschedule
                    </button>
                    <button className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'service' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Service History</h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Service history records will be displayed here.</p>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Invoices</h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Invoice records will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;