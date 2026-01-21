import { format } from "date-fns";
import type { Task } from "@/hooks/useTasks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreVertical, Pencil, Trash2, Clock, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const priorityStyles = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };

  const statusStyles = {
    pending: "status-pending",
    in_progress: "status-in-progress",
    completed: "status-completed",
  };

  const statusLabels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const StatusIcon = {
    pending: Circle,
    in_progress: Clock,
    completed: CheckCircle2,
  }[task.status];

  return (
    <Card className={cn(
      "group transition-all duration-200 hover:shadow-md border-border/50",
      task.status === "completed" && "opacity-75"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={cn(
                "font-semibold text-foreground truncate",
                task.status === "completed" && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", priorityStyles[task.priority])}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              
              <Badge variant="outline" className={cn("text-xs", statusStyles[task.status])}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusLabels[task.status]}
              </Badge>

              {task.due_date && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(task.due_date), "MMM d, yyyy")}
                </Badge>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {task.status !== "pending" && (
                <DropdownMenuItem onClick={() => onStatusChange(task.id, "pending")}>
                  <Circle className="h-4 w-4 mr-2" />
                  Mark as Pending
                </DropdownMenuItem>
              )}
              {task.status !== "in_progress" && (
                <DropdownMenuItem onClick={() => onStatusChange(task.id, "in_progress")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Mark as In Progress
                </DropdownMenuItem>
              )}
              {task.status !== "completed" && (
                <DropdownMenuItem onClick={() => onStatusChange(task.id, "completed")}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
