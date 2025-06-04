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
}> = ({ priority, onChange }) => {
  const priorities = ["low", "medium", "high", "urgent"] as const;
  const currentIndex = priorities.indexOf(priority);

  const config = getPriorityConfig(priority);

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % priorities.length;
    onChange(priorities[nextIndex]);
  };

  return (
    <div
      className='flex items-center gap-1 cursor-pointer group hover:scale-105 transition-transform duration-200'
      onClick={handleClick}
      title={`Priority: ${config.label} (click to change)`}
    >
      <div className='flex gap-1'>
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < config.dots ? config.color : "bg-gray-200"
            } group-hover:scale-110`}
          />
        ))}
      </div>
    </div>
  );
};

export { PrioritySelector };
