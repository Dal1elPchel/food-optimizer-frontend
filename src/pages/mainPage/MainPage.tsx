import { ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import FeatureOne from '@/pages/mainPage/assets/icons/feature1.png';
import FeatureTwo from '@/pages/mainPage/assets/icons/feature2.png';
import FeatureThree from '@/pages/mainPage/assets/icons/feature3.png';

import styles from './MainPage.module.scss';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className={styles.mainTitleSection}>
                <h1 className={styles.mainTitle}>
                    Найди{' '}
                    <span>
                        идеальные <br />
                    </span>{' '}
                    варианты заказа
                </h1>

                <p className={styles.mainText}>
                    Мы подберем лучшие блюда в ресторане под ваши желания, бюджет и компанию.
                </p>

                <button onClick={() => navigate('/filters')} className={styles.mainButton}>
                    <span className={styles.mainButtonContent}>
                        Составить варианты
                        <ArrowRightIcon />
                    </span>
                </button>
            </section>

            <section className={styles.mainFeatures}>
                <div className={styles.mainFeatureCard}>
                    <img src={FeatureOne} alt="Feature One" />
                    <div>учитываем предпочтения</div>
                </div>

                <div className={styles.mainFeatureCard}>
                    <img src={FeatureTwo} alt="Feature Two" />
                    <div>оптимальный выбор</div>
                </div>
                <div className={styles.mainFeatureCard}>
                    <img src={FeatureThree} alt="Feature Three" />
                    <div>Просто, быстро и вкусно</div>
                </div>
            </section>
        </>
    );
};

export default MainPage;
