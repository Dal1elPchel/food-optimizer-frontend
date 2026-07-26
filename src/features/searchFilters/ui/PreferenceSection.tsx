import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import {
    categories,
    Category,
    modes,
    OptimizeMode,
} from '@/features/searchFilters/model/SearchFilters';

import styles from '../styles/Filters.module.scss';

interface Field<T> {
    value: T[];
    setValue: (arg0: T) => void;
}

interface PreferenceProps {
    optimizeModes: Field<OptimizeMode>;
    chosenCategories: Field<Category>;
    excludedCategories: Field<Category>;
}

const PreferenceSection = ({
    optimizeModes,
    chosenCategories,
    excludedCategories,
}: PreferenceProps) => {
    const [excludedCategoriesOpen, setExcludedCategoriesOpen] = useState(false);

    return (
        <section className={styles.filterSection}>
            <div>
                <label className={styles.filterLabel}>4. Выберите режим (не обязательно):</label>
                <div className={styles.modeChose}>
                    {modes.map((item) => (
                        <label key={item} className={styles.filterOption}>
                            <input
                                type="checkbox"
                                checked={optimizeModes.value.includes(item)}
                                onChange={() => optimizeModes.setValue(item)}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>

                <label className={styles.filterLabel}>
                    5. Выберите категории (не обязательно):
                </label>
                <div className={styles.categoryChose}>
                    {categories.map((item) => (
                        <label key={item} className={styles.filterOption}>
                            <input
                                type="checkbox"
                                checked={chosenCategories.value.includes(item)}
                                onChange={() => chosenCategories.setValue(item)}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
                <button onClick={() => setExcludedCategoriesOpen(!excludedCategoriesOpen)}>
                    <label className={`${styles.filterLabel} ${styles.excludedCategoryChose}`}>
                        Исключить категории (не обязательно):
                        {excludedCategoriesOpen ? <ChevronUp /> : <ChevronDown />}
                    </label>
                </button>

                {excludedCategoriesOpen && (
                    <>
                        <div className={styles.categoryChose}>
                            {categories.map((item) => (
                                <label key={item} className={styles.filterOption}>
                                    <input
                                        type="checkbox"
                                        checked={excludedCategories.value.includes(item)}
                                        onChange={() => excludedCategories.setValue(item)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default PreferenceSection;
