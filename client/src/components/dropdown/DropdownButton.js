import React, {useContext, useRef, useState, useEffect} from 'react';
import './styles.css'
import mainContext from "../../context/mainContext";

const DropdownButton = ({list, getter, setter}) => {

    const ref = useRef()
    const [getToggle, setToggle] = useState(false)

    const handleClick = e => {
        if (!ref.current.contains(e.target)) return setToggle(false)
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => { document.removeEventListener("mousedown", handleClick) };
    }, []);

    function selectOption(text) {
        setter(text)
        setToggle(false)
    }

    return (
        <div ref={ref} >
            <div className='sorting my-1 position-relative'>
                <div className={`${getToggle && 'mainColor'} selection d-flex justify-content-between align-items-center`}
                     onClick={() => setToggle(!getToggle)}>
                    <div>{getter}</div>
                </div>
                {getToggle && <div className='optionSet position-absolute' >
                    {list.map((x, i) => <div key={i} className='option' onClick={() => selectOption(x)}>{x}</div>)}
                </div>}
            </div>

        </div>
    );
};

export default DropdownButton;