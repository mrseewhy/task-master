import "./App.css";
import { useState } from "react";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [updatedTask, setUpdatedTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const [tasks, setTasks] = useState<string[]>(["Hello1", "Hello2"]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length < 3) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setTasks([task, ...tasks]);
    setTask("");
  };
  const handleDelete = (taskTodelete: string) => {
    const updatedTasks = tasks.filter((task) => task !== taskTodelete);
    setTasks(updatedTasks);
  };
  const handleEdit = (taskToEdit: string, index: number | null) => {
    setEditIndex(index);
    setUpdatedTask(taskToEdit);
  };
  const handleCancel = () => setEditIndex(null);
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    let newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
    setEditIndex(null);
  };
  return (
    <div>
      <div className="bg-black text-white h-24 w-full">
        <div className="container mx-auto h-full">
          <div className="w-full h-full flex items-center">
            <h1 className="text-5xl">Task Master</h1>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full h-full ">
        <div className="container mx-auto min-h-screen">
          <div className="h-[70vh] flex flex-col ">
            <h1 className="text-3xl  font-bold my-8">Manage Tasks</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  className="h-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                {showError && (
                  <span className="text-xs text-red-600 block">
                    Task must have 3 characters or more
                  </span>
                )}
                <input
                  className="bg-indigo-600 px-8 py-3 text-sm text-white rounded-lg mt-4 mb-4 cursor-pointer"
                  type="submit"
                  value="Add Task"
                />
              </form>
            </div>
            <div>
              {tasks &&
                tasks.map((task, index) => (
                  <div
                    key={index}
                    className="bg-indigo-950 text-white py-4 px-2 rounded-lg mb-2 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {editIndex === index ? (
                        <form
                          onSubmit={(e) => handleUpdate(e, index)}
                          className="flex gap-4"
                        >
                          <input
                            className="px-1 py-1 border border-gray-300 rounded-lg"
                            type="text"
                            value={updatedTask}
                            onChange={(e) => setUpdatedTask(e.target.value)}
                          />
                          <input
                            className="text-sm bg-gray-200 text-gray-800 px-6 py-1 rounded-md cursor-pointer border border-gray-200"
                            type="submit"
                            value="update"
                          />
                          <button
                            onClick={handleCancel}
                            className="text-sm px-6 py-1 rounded-md cursor-pointer border border-gray-200"
                            type="button"
                          >
                            cancel
                          </button>
                        </form>
                      ) : (
                        <p>{task}</p>
                      )}
                    </div>
                    <p className="flex gap-2">
                      <span onClick={() => handleDelete(task)}>
                        <svg
                          className="w-4 h-4 cursor-pointer"
                          fill="#fff"
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z"></path>
                            <path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z"></path>
                            <path d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z"></path>
                          </g>
                        </svg>
                      </span>
                      <span onClick={() => handleEdit(task, index)}>
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 cursor-pointer"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M15.4998 5.50067L18.3282 8.3291M13 21H21M3 21.0004L3.04745 20.6683C3.21536 19.4929 3.29932 18.9052 3.49029 18.3565C3.65975 17.8697 3.89124 17.4067 4.17906 16.979C4.50341 16.497 4.92319 16.0772 5.76274 15.2377L17.4107 3.58969C18.1918 2.80865 19.4581 2.80864 20.2392 3.58969C21.0202 4.37074 21.0202 5.63707 20.2392 6.41812L8.37744 18.2798C7.61579 19.0415 7.23497 19.4223 6.8012 19.7252C6.41618 19.994 6.00093 20.2167 5.56398 20.3887C5.07171 20.5824 4.54375 20.6889 3.48793 20.902L3 21.0004Z"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
