import styles from './optionMenu.module.css';
import {useState, useEffect, useRef} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function OptionMenu ({optionList, isRight, alignX}) {

    const myRef = useRef();
    const [rightStyle, setRightStyle] = useState({color: 'red'});
    const [isOptionsOpen, openOptions] = useState(false);


    const clickOption = (option) => {
        openOptions(false);
        option.onClick(option.name);
    } 

    useEffect(()=>{
        if(isOptionsOpen && isRight) {
            setRightStyle(
                {
                    color: 'red',
                    backgroundColor: 'green',
                    transform: `translate(-${myRef.current.offsetWidth + alignX}px, 0px)`
                }
            )
        }

    }, [isOptionsOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (myRef.current && !myRef.current.contains(event.target)) {
              openOptions(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
    }, [])


    return (
        <div>
           <GiHamburgerMenu className={styles.icon} onClick={() => openOptions(!isOptionsOpen)}/>
            {
                isOptionsOpen ?
                    <div className={styles.menu} ref={myRef} visible={isOptionsOpen} style={rightStyle}>
                        <div className={styles.menuList}>
                        {
                            optionList.map((option) => (
                                    <div className={styles.option} onClick={() => clickOption(option)}>{option.name}</div>
                            ))
                        }
                    </div>
                </div>    
                : ''
            }
        </div>

    );
}