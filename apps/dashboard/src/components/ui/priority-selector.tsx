"use client";
const getPriorityConfig = (level: string) => {
  switch (level) {
    case "urgent":
      return { color: "bg-red-500", label: "Urgent", dots: 4 };
    case "high":
      return { color: "bg-orange-500", label: "High", dots: 3 };
    case "medium":
      return { color: "bg-yellow-500", label: "Medium", dots: 2 };
    case "low":
      return { color: "bg-green-500", label: "Low", dots: 1 };
    default:
      return { color: "bg-gray-400", label: "Low", dots: 1 };
  }
};

const PrioritySelector: React.FC<{
  priority: "low" | "medium" | "high" | "urgent";
  onChange: (priority: "low" | "medium" | "high" | "urgent") => void;
  viewOnly: boolean;
}> = ({ priority, onChange, viewOnly }) => {
  const priorities = ["low", "medium", "high", "urgent"] as const;
  const currentIndex = priorities.indexOf(priority);

  const config = getPriorityConfig(priority);

  const handleDotClick = (dotIndex: number, e: React.MouseEvent) => {
    if (viewOnly) return;

    e.stopPropagation();
    // Convert dot index (0-3) to priority level (1-4 dots)
    const priorityLevel = dotIndex + 1;
    const newPriority = priorities[priorityLevel - 1];
    onChange(newPriority);
  };

  const handleContainerClick = () => {
    if (viewOnly) return;
    const nextIndex = (currentIndex + 1) % priorities.length;
    onChange(priorities[nextIndex]);
  };

  return (
    <div
      className={`flex items-center gap-1  group ${!viewOnly && "hover:scale-105 cursor-pointer"} transition-transform duration-200`}
      onClick={handleContainerClick}
      title={`Priority: ${config.label} (click dots for specific priority or container to cycle)`}
    >
      <div className='flex gap-1'>
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300  ${
              i < config.dots ? config.color : "bg-gray-200 hover:bg-gray-300"
            } ${!viewOnly && "group-hover:scale-110 hover:!scale-125 cursor-pointer"}`}
            onClick={(e) => handleDotClick(i, e)}
            title={`Set to ${priorities[i]} priority`}
          />
        ))}
      </div>
    </div>
  );
};

export { PrioritySelector };
