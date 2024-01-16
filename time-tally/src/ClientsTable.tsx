import { useContext, useMemo } from "react";
import DataContext from "./context/DataContext";
import ClientsTableRow from "./ClientsTableRow";

const ClientsTable = () => {
  const { clients, isLoading, fetchError } = useContext(DataContext);

  const sortedClients = useMemo(() => {
    return clients.sort((a, b) => a.name.localeCompare(b.name));
  }, [clients]);

  return (
    <>
      {isLoading && <p>Loading logItems...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      <div id="tableTop">
        <div className="re-heading">Clients</div>
      </div>

      {!fetchError && !isLoading && clients.length ? (
        <table className="re-table">
          <thead>
            <tr>
              <th className="re-col-wide">Client Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client) => (
              <ClientsTableRow
                key={client.id}
                id={client.id}
                name={client.name}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </>
  );
};

export default ClientsTable;
