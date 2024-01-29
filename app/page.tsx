"use client";

import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { Reactive, For, useObservable } from "@legendapp/state/react";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  text: string;
  id: string;
};

export type TodoState = {
  todos: Todo[];
  currentTodo: Todo;
};

enableReactComponents();

export default function Home() {
  const { todos, currentTodo } = useObservable<TodoState>({
    todos: [],
    currentTodo: { id: "", text: "" },
  });

  const handleOnTodoItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentTodo.text.set(e.target.value);
  };

  const handleOnAddTodo = () => {
    const uuid = uuidv4();
    currentTodo.id.set(uuid);

    todos.push({
      id: uuid,
      text: currentTodo.text.get(),
    });

    currentTodo.set({ id: "", text: "" });

    console.log(currentTodo.get());
    console.log(todos.get());
  };

  console.log("render");

  return (
    <div className="flex flex-col h-full px-12 py-36 items-center justify-center">
      <div className="flex flex-col mx-auto gap-1 max-w-56">
        <label className="font-bold" htmlFor="todo">
          Task
        </label>
        <Reactive.input
          id="todo"
          required
          $value={currentTodo.text}
          className="border border-1 border-black p-2 w-full"
          type="text"
          onChange={handleOnTodoItemChange}
        />
        <button
          className="mt-4 px-4 w-full py-2 bg-blue-500 text-white"
          onClick={handleOnAddTodo}
        >
          Add todo
        </button>
      </div>
      <ul className="my-4">
        <For each={todos}>
          {(todo) => <li className="flex flex-col mb-1">{todo.get()?.text}</li>}
        </For>
      </ul>
    </div>
  );
}
