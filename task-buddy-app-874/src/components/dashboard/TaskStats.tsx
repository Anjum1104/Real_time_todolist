import type { Task } from "@/hooks/useTasks";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Circle, ListTodo } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const items = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      className: "bg-primary/10 text-primary",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Circle,
      className: "bg-muted text-muted-foreground",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      className: "bg-primary/10 text-primary",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      className: "bg-success/10 text-success",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${item.className}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
