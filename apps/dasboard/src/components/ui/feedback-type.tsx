import { BadgeAlert, CircleEllipsis, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const ICON_MAP = {
  issue: <BadgeAlert size={18} />,
  idea: <Lightbulb size={18} />,
  feedback: <CircleEllipsis size={18} />,
};

const BACKGROUND_CLASS = {
  issue: "bg-destructive p-2 rounded-4xl flex items-center justify-center",
  idea: "bg-blue-400 p-2 rounded-4xl flex items-center justify-center",
  feedback: "bg-primary p-2 rounded-4xl flex items-center justify-center",
};

const TYPE_MAP = {
  issue: "Issue",
  idea: "Idea",
  feedback: "Feedback",
};

const FeedbackType = ({ type }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={BACKGROUND_CLASS[type]}>{ICON_MAP[type]}</div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{TYPE_MAP[type]}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { FeedbackType };
