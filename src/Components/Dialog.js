import React from 'react';
import styles from './Dialog.module.css';

const Dialog = (props) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.Dialog}>
                <div className={styles.Dialog__header}>
                    <div className={styles['Dialog__header-left']}>
                        <i className={`material-icons ${styles['Dialog__header-icon']}`}>folder</i>
                        <span className={styles['Dialog__header-text']}>Create New Folder</span>
                    </div>

                    <div className={styles['Dialog__header-right']}>
                        <i onClick={props.canselNewFile} className={`material-icons ${styles['Dialog__header-close']}`}>close</i>
                    </div>
                </div>
                <div className={styles.Dialog__content}>
                    <span className={styles['Dialog__content-text']} >Give this folder a name</span>
                    <input type="text" className={styles['Dialog__content-input']} placeholder="Folder Name..." />
                </div>
                <div className={styles.Dialog__footer}>
                    <button onClick={props.canselNewFile} className={styles['Dialog__footer-cancel']}>Cancel</button>
                    <button className={styles['Dialog__footer-create']}>Create</button>
                </div>
            </div>
        </div>

    )
}

export default Dialog;
