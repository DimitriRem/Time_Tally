import { useContext } from 'react'
import DataContext from "./context/DataContext";

const OptionsMenu = () => {

    const { theme, setTheme, currency, setCurrency, setIsOptionsOpen, setIsHelpOpen } = useContext(DataContext);

    const handleTheme = () => {
        theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
    };

    const handleHelp = () => {
        setIsOptionsOpen(false);
        setIsHelpOpen(true);
    };

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <div id="optionsMenu">
            <div className="optionsItem" onClick={handleTheme}>Toggle Theme</div>
            <div className="optionsItem">Currency Symbol:
                <input
                    type="text"
                    width="50px"
                    id="currencyInput"
                    value={currency}
                    onChange={handleCurrencyChange}
                ></input></div>
            <div className="optionsItem" onClick={handleHelp}>Help</div>
            <div className='optionsFooter'>TimeTally &copy;2023, Dimitri Remoundos</div>
        </div>
    )
}

export default OptionsMenu