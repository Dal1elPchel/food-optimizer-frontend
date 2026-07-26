import styles from '../styles/Filters.module.scss';

interface Field<T> {
    value: T;
    change: (value: T) => void;
}

interface BudgetProps {
    budget: Field<number>;
    personCount: Field<number>;
}

const BudgetSection = ({ budget, personCount }: BudgetProps) => {
    return (
        <section className={styles.filterSection}>
            <div>
                <label className={styles.filterLabel}>6. Введите бюджет:</label>

                <div>
                    <input
                        type="range"
                        min="100"
                        className={styles.budgetInput}
                        max="10000"
                        step="100"
                        value={budget.value}
                        onChange={(e) => {
                            const value = Number(e.target.value);

                            if (value >= 0 && value <= 10000) {
                                budget.change(value);
                            }
                        }}
                    />

                    <div className={styles.budgetRangeLabels}>
                        <span>500 ₽</span>
                        <span>10000 ₽</span>
                    </div>
                </div>

                <div className={styles.budgetLabel}>{budget.value}</div>

                <label className={styles.filterLabel}>7. Сколько человек:</label>

                <div className={styles.peopleCount}>
                    <button
                        onClick={() => {
                            personCount.change(Math.max(1, personCount.value - 1));
                        }}
                    >
                        -
                    </button>

                    <span>{personCount.value}</span>

                    <button
                        onClick={() => {
                            personCount.change(Math.min(20, personCount.value + 1));
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BudgetSection;
