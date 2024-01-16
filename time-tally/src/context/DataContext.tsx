import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../utils/api";

interface LogItem {
    project: string;
    details: string;
    client: string;
    startTime: string;
    endTime: string;
    id: string;
    rate: string;
}

interface Client {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
    client: string;
}

interface Rate {
    id: string;
    rate: string;
    label: string;

}

interface DataContextType {
    addNewClientIsVisible: boolean;
    addNewProjectIsVisible: boolean;
    addNewRateIsVisible: boolean;
    clients: Client[];
    currentNav: string;
    fetchError: string;
    isLoading: boolean;
    logItems: LogItem[];
    newLogItem: object;
    projects: Project[];
    rates: Rate[];
    status: string;
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
}

const DataContext = createContext<DataContextType>({
    addNewClientIsVisible: false,
    addNewProjectIsVisible: false,
    addNewRateIsVisible: false,
    clients: [],
    currentNav: "",
    fetchError: "",
    isLoading: false,
    logItems: [],
    newLogItem: {},
    projects: [],
    rates: [],
    status: "",
    addNewClientClose: () => {
        throw new Error("Function not implemented.");
    },
    addNewClientPop: () => {
        throw new Error("Function not implemented.");
    },
    addNewProjectClose: () => {
        throw new Error("Function not implemented.");
    },
    addNewProjectPop: () => {
        throw new Error("Function not implemented.");
    },
    addNewRateClose: () => {
        throw new Error("Function not implemented.");
    },
    addNewRatePop: () => {
        throw new Error("Function not implemented.");
    },
    api: () => {
        throw new Error("Function not implemented.");
    },
    fetchData: () => {
        throw new Error("Function not implemented.");
    },
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
    setStatus: () => { }
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
    const [addNewProjectIsVisible, setAddNewProjectIsVisible] = useState<boolean>(false);
    const [addNewClientIsVisible, setAddNewClientIsVisible] = useState<boolean>(false);
    const [addNewRateIsVisible, setAddNewRateIsVisible] = useState<boolean>(false);
    const [currentNav, setCurrentNav] = useState<string>("log");

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
        let timeoutId: NodeJS.Timeout;

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
                currentNav,
                logItems,
                isLoading,
                fetchData,
                fetchError,
                newLogItem,
                projects,
                rates,
                setAddNewClientIsVisible,
                setAddNewProjectIsVisible,
                setAddNewRateIsVisible,
                setClients,
                setCurrentNav,
                setFetchError,
                setLogItems,
                setNewLogItem,
                setProjects,
                setRates,
                setStatus,
                status,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;