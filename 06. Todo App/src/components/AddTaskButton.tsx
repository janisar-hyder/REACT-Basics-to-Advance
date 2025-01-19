import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton = ({ onClick }: AddTaskButtonProps) => {
  return (
    <Button
      variant="outline"
      className="task-card bg-white hover:bg-gray-50 cursor-pointer flex items-center justify-center min-h-[100px] border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-200"
      onClick={onClick}
    >
      <Plus size={24} className="text-gray-400" />
    </Button>
  );
};

export default AddTaskButton;