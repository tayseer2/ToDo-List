import { useRef, useState, useEffect } from "react";
import Alert from "./Alert";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [alert, setAlert] = useState(false);
  let inputRef = useRef();

  useEffect(() => {
    const storedToDoList = localStorage.getItem("toDoList");
    if (storedToDoList) {
      setToDoList(JSON.parse(storedToDoList));
    }
  }, []);

  const updateToDoList = (newList) => {
    setToDoList(newList);
    localStorage.setItem("toDoList", JSON.stringify(newList));
  };

  const handleAdd = () => {
    const newTask = inputRef.current.value;
    if (newTask === "") {
      setAlert(true);
    } else {
      const updatedList = [...toDoList, { item: newTask, done: false }];
      updateToDoList(updatedList);
      setAlert(false);
    }
    inputRef.current.value = "";
  };

  const handleDone = (index) => {
    const newToDoList = [...toDoList];
    newToDoList[index].done = !newToDoList[index].done;
    updateToDoList(newToDoList);
  };

  const handleRemove = (index) => {
    let newToDos = [...toDoList];
    newToDos.splice(index, 1);
    updateToDoList(newToDos);
  };

  return (
    <>
      {alert && (
        <div
          className="w-[80%] mx-auto mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold mr-2">Error!</strong>
          <span className="block sm:inline">
            Please enter a task before adding it to the list.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => {
                setAlert(false);
              }}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <div className="flex justify-center items-center mt-28">
        <div className="bg-[#E0F1EF] rounded-xl w-[90%] md:w-[45%] text-center py-16">
          <h2 className="mb-8 text-3xl font-bold">ToDo List!</h2>

          <div className="space-x-2">
            <input
              type="text"
              className="w-[75%] p-2 rounded-md outline-none"
              placeholder="Add Your New ToDo..."
              ref={inputRef}
            />
            <button
              onClick={() => handleAdd()}
              className="bg-[#8B5EC6] hover:bg-purple-700 transition-all duration-500 py-2 px-4 rounded-md text-white"
            >
              Add
            </button>
          </div>

          <ul className="mt-8">
            {toDoList.map((task, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-center items-center mb-6"
                >
                  <div className="flex justify-between items-center p-2 bg-white w-[90%] md:w-[85%] rounded-md">
                    <li
                      onClick={() => handleDone(index)}
                      className={`cursor-pointer break-words whitespace-normal overflow-hidden text-left max-w-[80%] ${
                        task.done ? "line-through" : ""
                      }`}
                    >
                      {task.item}
                    </li>
                    <button
                      onClick={() => handleRemove(index)}
                      className="bg-[#DC3545] py-3 px-6 rounded-md hover:bg-red-600 cursor-pointer"
                    >
                      <img src="/trash.svg" alt="trash icon" className="w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
