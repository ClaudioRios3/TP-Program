export const InicioTab = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
            <p className="text-gray-600">
                Bienvenido al panel de control. Aquí irán tus estadísticas principales,
                gráficos de ventas y atajos.
            </p>
            {/* Aquí podrías agregar gráficas (ej. con Recharts) */}
        </div>
    );
};