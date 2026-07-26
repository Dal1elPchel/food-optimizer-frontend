import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../shared/assets/icons/Logo.png';
import styles from './Header.module.scss';

interface HeaderProps {
    isDarkTheme: boolean;
    onThemeToggle: () => void;
}

const Header = ({ isDarkTheme, onThemeToggle }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.headerLogo}>
                <img src={Logo} alt="Logo" />
            </Link>

            <nav
                className={`${styles.headerNav} 
            ${isMobileMenuOpen ? styles.headerNavOpen : ''}`}
            >
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link to="/" onClick={closeMobileMenu}>
                            Главная
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <a href="#" onClick={closeMobileMenu}>
                            О проекте
                        </a>
                    </li>
                    <li className={styles.menuItem}>
                        <a href="#" onClick={closeMobileMenu}>
                            Избранное
                        </a>
                    </li>
                </ul>
            </nav>

            <div className={styles.headerActions}>
                <button
                    className={styles.headerNavButton}
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    aria-label="Открыть меню"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

                <button
                    className={styles.headerTheme}
                    onClick={onThemeToggle}

                    aria-label="Изменить тему"
                >
                    {isDarkTheme ? <Sun /> : <Moon />}
                </button>
            </div>
        </header>
    );
};

export default Header;
