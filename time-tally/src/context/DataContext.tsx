import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../utils/api";
interface LogItem {
    client: string;
    details: string;
    endTime: string;
    id: string;
    project: string;
    rate: string;
    startTime: string;
}
interface Client {
    id: string;
    name: string;
}
interface Project {
    client: string;
    id: string;
    name: string;
}
interface Rate {
    id: string;
    label: string;
    rate: string;
}
interface DataContextType {
    addNewClientIsVisible: boolean;
    addNewProjectIsVisible: boolean;
    addNewRateIsVisible: boolean;
    clients: Client[];
    currentNav: string;
    fetchError: string;
    isLoading: boolean;
    isHelpOpen: boolean;
    isOptionsOpen: boolean;
    isSmallScreen: boolean;
    logItems: LogItem[];
    newLogItem: object;
    projects: Project[];
    rates: Rate[];
    status: string;
    theme: string;
    currency: string;
    addNewClientClose: () => void;
    addNewClientPop: () => void;
    addNewProjectClose: () => void;
    addNewProjectPop: () => void;
    addNewRateClose: () => void;
    addNewRatePop: () => void;
    api: (url: string, method: string, body: {}) => void;
    fetchData: () => void;
    setClients: React.Dispatch<React.SetStateAction<Client[]>>;
    setAddNewClientIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddNewProjectIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAddNewRateIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentNav: React.Dispatch<React.SetStateAction<string>>;
    setFetchError: React.Dispatch<React.SetStateAction<string>>;
    setLogItems: React.Dispatch<React.SetStateAction<LogItem[]>>;
    setNewLogItem: React.Dispatch<React.SetStateAction<object>>;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    setRates: React.Dispatch<React.SetStateAction<Rate[]>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setTheme: React.Dispatch<React.SetStateAction<string>>
    setCurrency: React.Dispatch<React.SetStateAction<string>>
    setIsOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsHelpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType>({
    addNewClientIsVisible: false,
    addNewProjectIsVisible: false,
    addNewRateIsVisible: false,
    clients: [],
    currentNav: "",
    fetchError: "",
    isLoading: false,
    isOptionsOpen: false,
    isHelpOpen: false,
    isSmallScreen: false,
    logItems: [],
    newLogItem: {},
    projects: [],
    rates: [],
    status: "",
    theme: "",
    currency: "",
    addNewClientClose: () => { },
    addNewClientPop: () => { },
    addNewProjectClose: () => { },
    addNewProjectPop: () => { },
    addNewRateClose: () => { },
    addNewRatePop: () => { },
    api: () => { },
    fetchData: () => { },
    setClients: () => { },
    setAddNewClientIsVisible: () => { },
    setAddNewProjectIsVisible: () => { },
    setAddNewRateIsVisible: () => { },
    setCurrentNav: () => { },
    setFetchError: () => { },
    setLogItems: () => { },
    setNewLogItem: () => { },
    setProjects: () => { },
    setRates: () => { },
    setStatus: () => { },
    setTheme: () => { },
    setCurrency: () => { },
    setIsOptionsOpen: () => { },
    setIsHelpOpen: () => { }

});
interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
    const [logItems, setLogItems] = useState<LogItem[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [rates, setRates] = useState<Rate[]>([]);
    const [newLogItem, setNewLogItem] = useState<object>({});
    const [fetchError, setFetchError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<string>("");
    const [theme, setTheme] = useState<string>("light-theme");
    const [addNewProjectIsVisible, setAddNewProjectIsVisible] = useState<boolean>(false);
    const [addNewClientIsVisible, setAddNewClientIsVisible] = useState<boolean>(false);
    const [addNewRateIsVisible, setAddNewRateIsVisible] = useState<boolean>(false);
    const [currentNav, setCurrentNav] = useState<string>("log");
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const [currency, setCurrency] = useState<string>("$");
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const [
                logItemsResponse,
                clientsResponse,
                projectsResponse,
                ratesResponse,
            ] = await Promise.all([
                api("/log", "GET", ""),
                api("/clients", "GET", ""),
                api("/projects", "GET", ""),
                api("/rates", "GET", ""),
            ]);

            if (!logItemsResponse.ok) throw Error("Did not receive expected data");
            const logItemsData = await logItemsResponse.json();
            setLogItems(logItemsData);

            if (!clientsResponse.ok) throw Error("Did not receive expected data (clients)");
            const clientsData = await clientsResponse.json();
            setClients(clientsData);

            if (!projectsResponse.ok) throw Error("Did not receive expected data (projects)");
            const projectsData = await projectsResponse.json();
            setProjects(projectsData);

            if (!ratesResponse.ok) throw Error("Did not receive expected data (rates)");
            const ratesData = await ratesResponse.json();
            setRates(ratesData);

            setFetchError("");
        } catch (err: any) {
            setFetchError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        window.innerWidth < 850 ? setIsSmallScreen(true) : setIsSmallScreen(false);
    }, []);



    useEffect(() => {
        let timeoutId: any;

        if (status !== "") {
            timeoutId = setTimeout(() => {
                setStatus("");
            }, 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [status]);

    const addNewProjectPop = () => {
        setAddNewProjectIsVisible(true);
    };

    const addNewProjectClose = () => {
        setAddNewProjectIsVisible(false);
    };

    const addNewClientPop = () => {
        setAddNewClientIsVisible(true);
    };

    const addNewClientClose = () => {
        setAddNewClientIsVisible(false);
    };

    const addNewRatePop = () => {
        setAddNewRateIsVisible(true);
    };

    const addNewRateClose = () => {
        setAddNewRateIsVisible(false);
    };

    return (
        <DataContext.Provider
            value={{
                addNewClientClose,
                addNewClientIsVisible,
                addNewClientPop,
                addNewProjectClose,
                addNewProjectIsVisible,
                addNewProjectPop,
                addNewRateClose,
                addNewRateIsVisible,
                addNewRatePop,
                api,
                clients,
                currency,
                currentNav,
                logItems,
                isLoading,
                isSmallScreen,
                isOptionsOpen,
                isHelpOpen,
                fetchData,
                fetchError,
                newLogItem,
                projects,
                rates,
                setAddNewClientIsVisible,
                setAddNewProjectIsVisible,
                setAddNewRateIsVisible,
                setClients,
                setCurrency,
                setCurrentNav,
                setFetchError,
                setIsOptionsOpen,
                setIsHelpOpen,
                setLogItems,
                setNewLogItem,
                setProjects,
                setRates,
                setStatus,
                status,
                setTheme,
                theme
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;