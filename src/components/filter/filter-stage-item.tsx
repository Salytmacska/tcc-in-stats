import styles from './filter-stage-item.module.css';

export default function FilterStageItem({value, onChange, name}): JSX.Element {
    return (
        <div className={styles['stage-item']} onClick={() => onChange(!value)}>
            <div>
                <span className={value ? `${styles['item-text']} ${styles['item-text--selected']}` : styles['item-text']}>{name}</span>
            </div>
        </div>
    );
};
