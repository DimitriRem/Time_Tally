import { useContext } from 'react'
import DataContext from "./context/DataContext";

const OptionsMenu = () => {

    const { theme, setTheme } = useContext(DataContext);

    const handleTheme = () => {
        console.log("BOOM" + theme);
        theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
    }

    return (
        <div id="optionsMenu">
            <div className="optionsItem" onClick={handleTheme}>Toggle Theme</div>
            <div className="optionsItem">Currency Symbol</div>
            <div className="optionsItem">Help</div>
            <div className="optionsItem">About</div>
        </div>
    )
}

export default OptionsMenu