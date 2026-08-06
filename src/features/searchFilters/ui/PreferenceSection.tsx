import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
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

interface Preference {
    optimizeModes: Field<OptimizeMode>;
    chosenCategories: Field<Category>;
    excludedCategories: Field<Category>;
}

interface PreferenceProps {
    generalPreferences: Preference[];
}

const PreferenceSection = ({ generalPreferences }: PreferenceProps) => {
    const [personCount, setPersonCount] = useState(1);
    const [excludedOpen, setExcludedOpen] = useState<Record<number, boolean>>({});

    const toggleExcludedOpen = (index: number) =>
        setExcludedOpen((prev) => ({ ...prev, [index]: !prev[index] }));

    const addPerson = () => {
        if (personCount < generalPreferences.length) {
            setPersonCount((prev) => prev + 1);
        }
    };

    const removePerson = (index: number) => {
        setPersonCount(index);
    };

    return (
        <section className={styles.filterSection}>
            {generalPreferences.slice(0, personCount).map((person, index) => {
                const { optimizeModes, chosenCategories, excludedCategories } = person;

                return (
                    <div key={index} className={styles.personBlock}>
                        <div className={styles.personHeader}>
                            <span className={styles.personTitle}>Человек {index + 1}</span>
                            {index > 0 && (
                                <button
                                    type="button"
                                    className={styles.removePersonBtn}
                                    onClick={() => removePerson(index)}
                                    aria-label="Убрать"
                                >
                                    <Minus size={16} />
                                </button>
                            )}
                        </div>

                        <label className={styles.filterLabel}>
                            7. Выберите режим (не обязательно):
                        </label>
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
                            8. Выберите категории (не обязательно):
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

                        <button type="button" onClick={() => toggleExcludedOpen(index)}>
                            <label
                                className={`${styles.filterLabel} ${styles.excludedCategoryChose}`}
                            >
                                9. Исключить категории (не обязательно):
                                {excludedOpen[index] ? <ChevronUp /> : <ChevronDown />}
                            </label>
                        </button>

                        {excludedOpen[index] && (
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
                        )}
                    </div>
                );
            })}

            {personCount < generalPreferences.length && (
                <button type="button" className={styles.addPersonBtn} onClick={addPerson}>
                    <Plus size={18} />
                    Добавить человека
                </button>
            )}
        </section>
    );
};

export default PreferenceSection;
