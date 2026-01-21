import { useState, useMemo } from "react";
import { useTasks, type Task } from "@/hooks/useTasks";
import { useProfile } from "@/hooks/useProfile";
import type { TaskInput } from "@/lib/validations";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { TaskDialog } from "@/components/dashboard/TaskDialog";
import { ProfileDialog } from "@/components/dashboard/ProfileDialog";
import { TaskFilters } from "@/components/dashboard/TaskFilters";
import { TaskStats } from "@/components/dashboard/TaskStats";
import { Button } from "@/components/ui/button";
import { Plus, Inbox, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const { profile } = useProfile();
  
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const hasActiveFilters = search !== "" || statusFilter !== "all" || priorityFilter !== "all";

  const handleOpenCreateTask = () => {
    setEditingTask(null);
    setTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const handleTaskSubmit = async (data: TaskInput) => {
    if (editingTask) {
      await updateTask.mutateAsync({ id: editingTask.id, ...data });
    } else {
      await createTask.mutateAsync(data);
    }
    setTaskDialogOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask.mutate(id);
  };

  const handleStatusChange = (id: string, status: Task["status"]) => {
    updateTask.mutate({ id, status });
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onOpenProfile={() => setProfileDialogOpen(true)} />

      <main className="container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your tasks today.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 animate-slide-up">
          <TaskStats tasks={tasks} />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          
          <Button onClick={handleOpenCreateTask} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Task List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {hasActiveFilters ? "No matching tasks" : "No tasks yet"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              {hasActiveFilters
                ? "Try adjusting your filters or search term."
                : "Get started by creating your first task."}
            </p>
            {!hasActiveFilters && (
              <Button onClick={handleOpenCreateTask}>
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TaskCard
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        task={editingTask}
        onSubmit={handleTaskSubmit}
        isLoading={createTask.isPending || updateTask.isPending}
      />

      <ProfileDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} />
    </div>
  );
}
