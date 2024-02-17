import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import AddColumnButton from "../../components/AddColumnButton";

interface Project {
  id: string;
  name: string;
}

export async function loader({ params }: any): Promise<Project> {
  const { projectId } = params;
  const response = await axios.get(
    `http://localhost:3000/projects/${projectId}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
  );

  return response.data;
}

export default function ProjectById() {
  const project: any = useLoaderData();
  const projectColumns = project?.project_columns;

  const navigate = useNavigate();

  const handleMoveTaskColumn = (taskId: number, newColumn: any) => {
    console.log("taskId", taskId);
    console.log("newColumn", newColumn);
    axios
      .patch(`http://localhost:3000/tasks/${taskId}`, {
        project_column_id: newColumn.id,
      })
      .then(refresh);
  };

  const refresh = () => {
    navigate(".", { replace: true });
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>{project.name}</h1>
      <AddColumnButton projectId={project.id} refreshColumns={refresh} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${projectColumns.length}, 1fr)`,
          gridGap: "10px",
        }}
      >
        {projectColumns.map((column: any, index: number) => {
          return (
            <div
              key={column.id}
              style={{
                border: "2px red dotted",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>{column.name}</h2>
              {column.tasks.map((task: ProjectColumnTask) => {
                const rightColumn = projectColumns[index + 1];
                const leftColumn = projectColumns[index - 1];

                return (
                  <TaskCard
                    key={task.name}
                    {...task}
                    moveLeft={() => handleMoveTaskColumn(task.id, leftColumn)}
                    moveRight={() => handleMoveTaskColumn(task.id, rightColumn)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ProjectColumnTask {
  id: number;
  name: string;
  moveLeft: () => void;
  moveRight: () => void;
}

function TaskCard(props: ProjectColumnTask) {
  const { moveLeft, moveRight } = props;
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{props.name}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button onClick={moveLeft}>{`<`}</button>
        <button onClick={moveRight}>{`>`}</button>
      </div>
    </div>
  );
}
