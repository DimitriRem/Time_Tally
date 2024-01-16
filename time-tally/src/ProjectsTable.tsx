import React, { useContext, useMemo } from "react";
import DataContext from "./context/DataContext";
import ProjectsTableRow from "./ProjectsTableRow";

const ProjectsTable = () => {
  const { projects, isLoading, fetchError } = useContext(DataContext);

  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => a.name.localeCompare(b.name));
  }, [projects]);

  return (
    <>
      {isLoading && <p>Loading logItems...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      <div id="tableTop">
        <div className="re-heading">Projects</div>
      </div>

      {!fetchError && !isLoading && projects.length ? (
        <table className="re-table">
          <thead>
            <tr>
              <th className="re-col-wide">Project Name</th>
              <th className="re-col-wide">Client</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <ProjectsTableRow
                key={project.id}
                id={project.id}
                name={project.name}
                client={project.client}
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

export default ProjectsTable;
