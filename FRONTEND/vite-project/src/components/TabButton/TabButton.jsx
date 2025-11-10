import './TabButton.css';


/* --- Componente de Pestaña Reutilizable --- */

export const TabButton = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`tab-button ${isActive ? 'is-active' : ''}`}
        >
            <span>{label}</span>
        </button>
    );
};

export default TabButton;