import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./components/Dashboard";
import TablaProductos from './components/TablaProductos';
import FormsProductos from './components/FormsProductos';
import './Dashboard.css';

// Importamos iconos para hacerlo más visual.
// Necesitarás instalar lucide-react: npm install lucide-react
import { LayoutDashboard, ShoppingCart, Package, DollarSign } from 'lucide-react';




/* --- Hooks del Dashboard --- */
export function Dashboard() {
    const { authFetch, logout } = useContext(AuthContext);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({});
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [items, setItems] = useState([]);
    const facturaIdRef = useRef(null);


    // --- COMPONENTE PRINCIPAL (La lógica del Código 2) ---
    function App() {
        // 1. Definimos las pestañas como datos (¡ahora con íconos!)
        const tabs = [
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'productos', label: 'Productos', icon: <Package size={18} /> },
            { id: 'empleados', label: 'Empleados', icon: <Users size={18} /> },
            { id: 'ventas', label: 'Ventas', icon: <DollarSign size={18} /> },
        ];

        // 2. Estado para la pestaña activa
        const [activeTab, setActiveTab] = useState(tabs[0].id);

        // 3. Objeto "mapa" para el contenido (limpio y directo)
        const tabContent = {
            dashboard: <CarritoTab />,
            productos: <ProductosTab />,
            empleados: <EmpleadosTab />,
            ventas: <VentasTab />,
        };

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">

                    {/* Navegación de Pestañas:
          Aquí usamos .map() (del Código 2) para renderizar 
          el componente <TabButton> (del Código 1).
        */}
                    <nav className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                isActive={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </nav>

                    {/* Contenido de la Pestaña Activa:
          Usamos el "mapa" de contenido (del Código 2)
        */}
                    <main className="p-6 md:p-8">
                        {tabContent[activeTab]}
                    </main>

                </div>
            </div>
        );
    }
}