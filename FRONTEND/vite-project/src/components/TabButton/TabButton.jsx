import styles from './TabButton.module.css';


/* --- Componente de Pestaña Reutilizable --- */

export const TabButton = ({ label, icon, isActive, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.tabButton} ${isActive ? 'is-active' : ''}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default TabButton;