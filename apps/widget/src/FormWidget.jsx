import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./components/ui/dialog";
import { useState } from "react";

import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { BadgeAlert } from "lucide-react";
import { CircleEllipsis } from "lucide-react";

const feedbackOptions = [
  {
    type: "issue",
    label: "Report Issue",
    description: "Found a bug or something not working?",
    icon: Lightbulb,
    color: "text-red-500",
    bgColor: "bg-red-50 hover:bg-red-100",
  },
  {
    type: "idea",
    label: "Share Idea",
    description: "Have a suggestion for improvement?",
    icon: BadgeAlert,
    color: "text-blue-500",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    type: "feedback",
    label: "General Feedback",
    description: "Tell us what you think",
    icon: CircleEllipsis,
    color: "text-green-500",
    bgColor: "bg-green-50 hover:bg-green-100",
  },
];

function FormWidget({ config, externalTrigger = false }) {
  const { color, position } = config;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // useEffect(() => {
  //   if (!externalTrigger) return;

  //   const trigger = document.querySelector(
  //     "[data-aura-widget], #aura-widget-button"
  //   );

  //   if (trigger) {
  //     trigger.addEventListener("click", () => setIsPopupOpen(true));
  //   }

  //   return () => {
  //     if (trigger)
  //       trigger.removeEventListener("click", () => setIsPopupOpen(true));
  //   };
  // }, [externalTrigger]);

  return (
    <div
      className={`fixed z-50  ${position === "left" ? "left-[-36]" : "right-[-36]"}  bottom-28 rotate-90 `}
    >
      <Button
        onClick={() => setIsPopupOpen(true)}
        className={"rotate-180"}
        style={{ ...(color && { background: color }) }}
      >
        Feedback
      </Button>
      <Dialog open={isPopupOpen} onOpenChange={() => setIsPopupOpen(false)}>
        <DialogContent className='text-foreground border-0 !max-w-[250px] flex flex-col items-center justify-center'>
          <DialogTitle className='text-[1rem] font-[700]'>
            Help us Improve
          </DialogTitle>
          <div className='flex flex-col gap-2'>
            {feedbackOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button className='items-start justify-start'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <Icon className='h-4 w-4' />
                    </div>
                    {option.label}
                  </div>
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FormWidget;
