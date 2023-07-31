import { useRef } from 'react';
import styles from './Menu.module.scss';

interface MenuProps {
    options: string[],
    onSelect: (index: number) => void,
}

const Menu = ({ options, onSelect }: MenuProps) => {

    const renderOption = (option: string, index: number) => {
        return <li 
            key={index}
            className={styles.option}
            onClick={()=>onSelect(index)}
        >{option}</li>
    }

    return (
        <div className={styles.container}>
            <ul className={styles.menu}>
                {options.map(renderOption)}
            </ul>
        </div>
    )
}

export default Menu;