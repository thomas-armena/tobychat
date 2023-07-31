
import { useState, useRef } from "react";
import IconButton from "../IconButton"
import Menu from "../Menu";

interface MenuIconButtonProps {
    options: string[];
    onSelect: (option: number) => void;
}

const MenuIconButton = ({ options, onSelect }: MenuIconButtonProps) => {

    const [ showMenu, setShowMenu ] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = (e: Event) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setShowMenu(false);
        }
    }

    document.addEventListener('mouseup', handleClick)
    
    return (
        <div ref={ref}>
            <IconButton 
                iconName="more_horiz" 
                onPress={() => setShowMenu(!showMenu)} 
            />
            {showMenu && 
                <Menu 
                    options={options}
                    onSelect={onSelect}
                />
            }
        </div>
    )
}

export default MenuIconButton;