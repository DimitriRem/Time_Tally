import { useContext } from 'react'
import DataContext from "./context/DataContext";

const Help = () => {
    const { setIsHelpOpen } = useContext(DataContext);
    const handleHelpClose = () => {
        setIsHelpOpen(false);
    }
    return (
        <div id="helpContainer">
            <div id="helpHeader">
                <h1>Help</h1>
                <button onClick={handleHelpClose} className="toolButton">
                    X Close
                </button></div>
            <div id="helpContentBox">
                <p>Time Tally is a time logging app for workers who charge an hourly rate.<br />Here are some pointers:</p>

                <h3>Navigation</h3>
                <p>The four main buttons navigate to the specific pages for viewing and managing Time Logged, Projects, Clients and Rates.</p>

                <h3>Adding Rates</h3>
                <p>The typical first step is to create your rates. You can add as many rates as you like, eg. a standard rate, overtime rate or rates for different types of work.</p>
                <ol>
                    <li>Click on the <b>Rates</b> button</li>
                    <li>Fill in the fields in the "Add a New Rate" form
                        <ul><li><b>Rate Label:</b> Give your rate a name or description</li>
                            <li><b>Rate:</b> Specify the numerical value for your hourly rate</li></ul>
                    </li>
                    <li>Click on the <b>Add Rate</b> button to add the rate to your list</li>
                </ol>

                <h3>Adding Cients</h3>
                <p>You can add as many clients as you like. These are the people or businesses you charge for your work.</p>
                <ol>
                    <li>Click on the <b>Clients</b> button</li>
                    <li>Fil in the client name </li><li>Click on the <b>Add Client</b> button to add the client to your list</li></ol>

                <h3>Adding Projects</h3>
                <p>Projects are the jobs you are working on and are each assinged to a client.</p>
                <ol>
                    <li>Click on the <b>Projects</b> button</li>
                    <li>Fill in the fields in the "Add a New Project" form
                        <ul><li><b>Project Name:</b> Give your Project a name</li>
                            <li><b>Client:</b> Assign the project to the appropriate client</li></ul>
                    </li><li>Click on the <b>Add Project</b> button to add the project to your list</li></ol>

                <h3>Logging Time</h3>
                <p>When you have created a project, you can start logging the time you spent on it. </p>
                <ol>
                    <li>Click on the <b>Log Time</b> button</li>
                    <li>Fill in the fields in the form
                        <ul><li><b>Project Name and Client:</b> The form header wil display the currently selected project. Use the drop-down list to select another project. </li>
                            <li><b>Start Time:</b> Enter the time you began work on the project. The field next to start time allows you to change the date of the log (defaults to today) </li>
                            <li><b>End Time:</b> Enter the time you stopped working on the project for the day</li>
                            <li><b>Rate:</b> Select the applicable rate you are charging for the work</li>
                            <li><b>Work Details:</b> Enter a description of the work you did</li>
                        </ul>
                    </li><li>Click on the <b>Submit Hours</b> button to add the entry to the log. The total hours and fee is calculated and displayed on the button.</li></ol>
                <h3>Filtering Log by date</h3>
                <p>Use the<b>Filter by Date</b> widget to only display logs that fit within your specifie time frame. The filter is highlighted to alert you that it is active.</p>
                <h3>Changing Color Theme</h3>
                <ol><li>Click on the option menu on the top right</li>
                    <li>Click on <b>Toggle Theme</b> to toggle between a light or dark theme</li>
                </ol>
                <h3>Changing Currency Symbol</h3><p>
                    <ol><li>Click on the option menu on the top right</li>
                        <li>Change the symbol next to <b>Currency Symbol</b> to your peference</li>
                    </ol>
                </p>
            </div>
        </div>
    )
}

export default Help