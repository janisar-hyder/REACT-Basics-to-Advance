import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, description: string, color: string, dueDate: Date | undefined) => void;
  initialData?: {
    title: string;
    description: string;
    color: string;
    dueDate?: Date;
  };
  mode?: 'create' | 'edit';
}

const CreateTaskDialog = ({ open, onOpenChange, onSubmit, initialData, mode = 'create' }: CreateTaskDialogProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [color, setColor] = useState(initialData?.color || "#F2FCE2");
  const [date, setDate] = useState<Date | undefined>(initialData?.dueDate ? new Date(initialData.dueDate) : undefined);

  const colors = [
    { value: "#F2FCE2", label: "Soft Green" },
    { value: "#FEF7CD", label: "Soft Yellow" },
    { value: "#FEC6A1", label: "Soft Orange" },
    { value: "#E5DEFF", label: "Soft Purple" },
    { value: "#FFDEE2", label: "Soft Pink" },
    { value: "#FDE1D3", label: "Soft Peach" },
    { value: "#D3E4FD", label: "Soft Blue" },
    { value: "#F1F0FB", label: "Soft Gray" }
  ];

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, description, color, date);
      if (mode === 'create') {
        setTitle("");
        setDescription("");
        setColor("#F2FCE2");
        setDate(undefined);
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          <div className="grid gap-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c.value}
                  className={`w-6 h-6 rounded-full border-2 ${color === c.value ? 'border-gray-900' : 'border-transparent'}`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  type="button"
                  title={c.label}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{mode === 'create' ? 'Add Task' : 'Save Changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;