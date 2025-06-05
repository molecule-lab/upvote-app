import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const ListItemVisibilityStatus = ({ visibility, onClick, viewOnly }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant='outline'
          className='cursor-pointer rounded-xl '
        >
          {visibility ? (
            <Eye className='stroke-primary' />
          ) : (
            <EyeOff className='stroke-primary' />
          )}
        </Button>
      </TooltipTrigger>
      {!viewOnly && (
        <TooltipContent>
          {visibility ? "Make Private" : "Make Public"}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export { ListItemVisibilityStatus };
