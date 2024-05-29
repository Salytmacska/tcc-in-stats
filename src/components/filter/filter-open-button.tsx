import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './filter-open-button.module.css';

export default function FilterOpenButton(): JSX.Element {
    const onClickHandler = () => {
        const dialog = document.getElementById('filter-dialog') as HTMLDialogElement;
        dialog.showModal();
    }
    return (
        <div className="toggle_node_modules-@docusaurus-theme-classic-lib-theme-ColorModeToggle-styles-module colorModeToggle_node_modules-@docusaurus-theme-classic-lib-theme-Navbar-Content-styles-module">
            <button onClick={onClickHandler} className={styles['filter-btn'] + ' toggleButton_node_modules-\@docusaurus-theme-classic-lib-theme-ColorModeToggle-styles-module clean-btn'} type="button">
                <FontAwesomeIcon icon={faFilter} width='32px' height='32px'></FontAwesomeIcon>
            </button>
        </div>
    );
}
