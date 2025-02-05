import { getTasks, deleteTask, updateTask } from "@/lib/actions";

export default async function TaskListPage() {
  const tasks = await getTasks();

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 mb-2">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toDateString()}</p>
            <button onClick={async () => await updateTask(task._id, task.title, task.description, task.dueDate, !task.completed)}>
  {task.completed ? "Mark Incomplete" : "Mark Complete"}
</button>
<button onClick={async () => await deleteTask(task._id)}>Delete</button>

          </li>
        ))}
      </ul>
    </main>
  );
}
