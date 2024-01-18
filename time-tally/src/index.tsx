
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from "./context/DataContext";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <DataProvider><App /></DataProvider>);