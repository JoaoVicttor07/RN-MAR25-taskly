export interface TaskItemProps {
    title: string;
    description: string;
    categories: string[];
    isCompleted: boolean;
    onToggleComplete: () => void;
}