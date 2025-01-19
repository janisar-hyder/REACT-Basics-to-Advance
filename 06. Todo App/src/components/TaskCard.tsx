import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { format, isToday, isTomorrow, isPast, isThisWeek } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: Date;
  dueDate?: Date;
  completed: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskCard = ({ 
  id, 
  title, 
  description, 
  color, 
  createdAt, 
  dueDate, 
  completed,
  onDelete, 
  onEdit,
  onToggleComplete 
}: TaskCardProps) => {

  const formatDateDisplay = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE'); // Day name
    } else {
      return format(date, 'MMM d'); // e.g., Jan 19
    }
  };

  const getDueDateStatus = () => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    if (completed) return "completed";
    if (isPast(date)) return "overdue";
    if (isToday(date)) return "due-today";
    return "upcoming";
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <Card 
      className={cn(
        "transition-colors duration-200",
        completed ? "opacity-60 bg-gray-100" : ""
      )}
      style={{ backgroundColor: completed ? undefined : color }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={cn(
              "text-lg font-semibold",
              completed && "line-through"
            )}>{title}</CardTitle>
            <div className="flex flex-col gap-1 mt-1">
              <CardDescription className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                {formatDateDisplay(new Date(createdAt))}
              </CardDescription>
              {dueDate && (
                <CardDescription 
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full w-fit",
                    dueDateStatus === "overdue" && "bg-red-100 text-red-700",
                    dueDateStatus === "due-today" && "bg-yellow-100 text-yellow-700",
                    dueDateStatus === "upcoming" && "bg-blue-100 text-blue-700",
                    dueDateStatus === "completed" && "bg-green-100 text-green-700"
                  )}
                >
                  Due: {formatDateDisplay(new Date(dueDate))}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-gray-500 hover:text-green-600",
                completed && "text-green-600"
              )}
              onClick={() => onToggleComplete(id)}
            >
              <CheckCircle2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600"
              onClick={() => onEdit(id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={cn(
          "text-sm text-gray-600",
          completed && "line-through"
        )}>{description}</p>
      </CardContent>
    </Card>
  );
};

export default TaskCard;