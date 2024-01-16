import { useContext, useMemo } from "react";
import DataContext from "./context/DataContext";
import RatesTableRow from "./RatesTableRow";

const RatesTable = () => {
  const { rates, isLoading, fetchError } = useContext(DataContext);

  const sortedRates = useMemo(() => {
    return rates.sort((a, b) => a.label.localeCompare(b.label));
  }, [rates]);

  return (
    <>
      {isLoading && <p>Loading rates...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      <div id="tableTop">
        <div className="re-heading">Rates</div>
      </div>

      {!fetchError && !isLoading && rates.length ? (
        <table className="re-table">
          <thead>
            <tr>
              <th className="re-col-wide">Client Name</th>
              <th></th><th></th>
            </tr>
          </thead>
          <tbody>
            {sortedRates.map((rate) => (
              <RatesTableRow
                key={rate.id}
                id={rate.id}
                rate={rate.rate}
                label={rate.label}
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

export default RatesTable;
