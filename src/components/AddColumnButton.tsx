import axios from "axios";
import React from "react";

interface AddColumnButtonProps {
  projectId: number;
  refreshColumns: () => void;
}

export default function AddColumnButton(props: AddColumnButtonProps) {
  const { projectId, refreshColumns } = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newColumnName, setNewColumnName] = React.useState("");

  const handleAddColumn = async () => {
    if (newColumnName) {
      await axios.post(
        `http://localhost:3000/project/${projectId}/project_columns`,
        {
          name: newColumnName,
        },
      );
      setModalOpen(false);
      refreshColumns();
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
      >
        Add Column
      </button>
      {modalOpen && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-1/3 bg-white p-8">
            <h1 className="mb-4 text-2xl font-bold">Add Column</h1>
            <input
              type="text"
              placeholder="Column Name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="mb-4 w-full border border-gray-300 p-2"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
