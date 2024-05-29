import styles from './filter-bracket-item.module.css';

export default function FilterBracketItem({imageSrc, value, onChange, name}): JSX.Element {
    return (
        <div className={styles['bracket-item']} onClick={() => onChange(!value)}>
            <img className={value ? `${styles['bracket-img']} ${styles['bracket-img--selected']}` : styles['bracket-img']} src={imageSrc}></img>
            <div>
                <span className={styles['item-text']}>{name}</span>
            </div>
        </div>
    );
};
