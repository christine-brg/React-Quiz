import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from '../css/ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'default', name: 'Default', className: styles.default },
        { id: 'dark', name: 'Dark', className: styles.dark },
        { id: 'blue', name: 'Blue', className: styles.blue }
    ];

    return (
        <div className={styles.themeSwitcher}>
            <button
                className={styles.themeButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change theme"
            >
                🎨
            </button>

            <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
                {themes.map((t) => (
                    <div
                        key={t.id}
                        className={`${styles.themeOption} ${t.className}`}
                        onClick={() => {
                            setTheme(t.id);
                            setIsOpen(false);
                        }}
                    >
                        {t.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
