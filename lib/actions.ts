"use server";

import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { revalidatePath } from "next/cache";

// Create Task
export async function createTask(title: string, description: string, dueDate: string) {
  await connectDB();
  await Task.create({ title, description, dueDate });
  revalidatePath("/tasks");
}

// Get All Tasks
export async function getTasks() {
  await connectDB();
  return await Task.find().lean();
}

// Get Single Task
export async function getTaskById(id: string) {
  await connectDB();
  return await Task.findById(id).lean();
}

// Update Task
export async function updateTask(id: string, title: string, description: string, dueDate: string, completed: boolean) {
  await connectDB();
  await Task.findByIdAndUpdate(id, { title, description, dueDate, completed });
  revalidatePath("/tasks");
}

// Delete Task
export async function deleteTask(id: string) {
  await connectDB();
  await Task.findByIdAndDelete(id);
  revalidatePath("/tasks");
}
