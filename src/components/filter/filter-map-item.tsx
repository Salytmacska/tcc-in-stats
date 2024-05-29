import styles from './filter-map-item.module.css';

export default function FilterMapItem({imageSrc, value, onChange, name}): JSX.Element {
    return (
        <div className={styles['map-item']} onClick={() => onChange(!value)}>
            <img className={value ? `${styles['map-img']} ${styles['map-img--selected']}` : styles['map-img']} src={imageSrc}></img>
            <div>
                <span className={styles['item-text']}>{name}</span>
            </div>
        </div>
    );
};
