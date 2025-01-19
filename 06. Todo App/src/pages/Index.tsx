import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import AddTaskButton from '@/components/AddTaskButton';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import { useToast } from '@/components/ui/use-toast';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: Date;
  dueDate?: Date;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'todo' | 'completed'>('all');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string, color: string, dueDate?: Date) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      color,
      createdAt: new Date(),
      dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const editTask = (title: string, description: string, color: string, dueDate?: Date) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, title, description, color, dueDate }
        : task
    );
    
    setTasks(updatedTasks);
    setEditingTask(null);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleEditClick = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
      setIsDialogOpen(true);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'todo':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b p-4">
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      
      <main className="md:ml-64 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Sticky Wall</h1>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'todo' ? 'default' : 'outline'}
                onClick={() => setFilter('todo')}
              >
                To Do
              </Button>
              <Button 
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onDelete={deleteTask}
                onEdit={handleEditClick}
                onToggleComplete={toggleTaskComplete}
              />
            ))}
            <AddTaskButton onClick={() => {
              setEditingTask(null);
              setIsDialogOpen(true);
            }} />
          </div>
        </div>
      </main>

      <CreateTaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={editingTask ? editTask : addTask}
        initialData={editingTask || undefined}
        mode={editingTask ? 'edit' : 'create'}
      />
    </div>
  );
};

export default Index;