import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await axios.get("http://localhost:3000/projects", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
}
export default function ProjectIndexPage() {
  const projects: any = useLoaderData();
  return (
    <div>
      <h1>Project Index Page</h1>
      {projects.map((project: any) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
        </div>
      ))}
    </div>
  );
}
