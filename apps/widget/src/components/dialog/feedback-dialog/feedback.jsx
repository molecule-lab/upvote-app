import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { ChevronLeft } from "lucide-react";
import { Check } from "lucide-react";
import { ExternalLink } from "lucide-react";
import Logo from "../../aura-logo";
import { BadgeAlert } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { CircleEllipsis } from "lucide-react";
import { useQueryGetTenant } from "@/api/useQueryGetTenant";
import { useEffect } from "react";

const feedbackTypes = {
  issue: {
    icon: BadgeAlert,
    label: "Issue",
    title: "Report an Issue",
    description: "Tell us about a problem you encountered",
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    type: "issue",
  },
  idea: {
    icon: Lightbulb,
    label: "Idea",
    title: "Share an Idea",
    description: "Suggest a new feature or improvement",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    type: "idea",
  },
  feedback: {
    icon: CircleEllipsis,
    label: "Feedback",
    title: "General Feedback",
    description: "Share your thoughts and suggestions",
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    type: "feedback",
  },
};

const FeedbackDialog = ({
  isPopupOpen,
  clearData,
  submitted,
  selectedType,
  onBackButtonClick,
  setSelectedType,
  config,
  errors,
  title,
  email,
  description,
  handleTitleChange,
  handleEmailChange,
  handleDescriptionChange,
  onSubmitHandle,
  counter,
}) => {
  const { data: tenantData } = useQueryGetTenant({ tenantId: config.tenantId });

  useEffect(() => {
    console.log(tenantData);
  }, [tenantData]);

  if (!config.tenantId || !tenantData) {
    return (
      <Dialog open={isPopupOpen} onOpenChange={clearData}>
        <DialogTitle hidden />
        <DialogContent className='gap-0 text-foreground border-0 !max-w-[350px] w-[95%] min-h-[320px] flex flex-col items-center justify-start px-3 pt-3 pb-0'>
          <div className='flex flex-1 items-center justify-center flex-col gap-2'>
            <div className='flex items-center justify-center flex-col gap-2'>
              <div className='bg-destructive p-3 rounded-full flex items-center justify-center'>
                <BadgeAlert className='w-8 h-8' />
              </div>
              <div className='text-center'>
                <div className='text-xl font-semibold'>Not Found</div>
                <div className='text-sm text-muted-foreground mt-1 max-w-[80%] mx-auto'>
                  Please check if your tenant ID is correct or provide a valid
                  tenant ID to continue.
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              <Button
                onClick={() => window.open("https://app.aura.vote", "_blank")}
                className='w-full cursor-pointer'
              >
                Get Your Tenant ID
              </Button>
              <Button
                className='cursor-pointer'
                onClick={() =>
                  (window.location.href = "mailto:support@example.com")
                }
                variant='link'
              >
                Reach Out to Us
              </Button>
            </div>
          </div>

          <DialogFooter className='flex items-center w-full'>
            <div
              onClick={() => window.open("https://aura.vote", "_blank")}
              className='pb-1 flex items-center gap-1 self-end hover:text-foreground/30 text-foreground/50 fill-foreground/50 hover:fill-foreground/30 transition-all duration-100 cursor-pointer'
            >
              <span className='text-[10px]'>Powered By</span>
              <Logo />
              <span className='text-[10px]'>Aura</span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isPopupOpen} onOpenChange={clearData}>
      <DialogContent className='text-foreground border-0 !max-w-[350px] w-[95%] min-h-[320px] flex flex-col items-center justify-start px-3 pt-3 pb-0'>
        <DialogTitle hidden={submitted} className='text-xl w-full'>
          {selectedType ? (
            <div className='flex gap-2 items-center justify-start '>
              <div>
                <Button
                  onClick={onBackButtonClick}
                  variant='outline'
                  size='icon'
                  className='border-input border-solid cursor-pointer'
                >
                  <ChevronLeft className='w-5 h-5' />
                </Button>
              </div>
              <div>{selectedType.label}</div>
            </div>
          ) : (
            "Help us Improve!"
          )}
        </DialogTitle>
        {selectedType && !submitted ? (
          <div className='flex flex-col gap-2 w-full h-full flex-1'>
            {config.collectEmail && (
              <Input
                placeholder='Email'
                className={`border-input border-solid ${errors.email && "!border-destructive animate-shake duration-75 [animation-iteration-count:1]"}`}
                value={email}
                onChange={handleEmailChange}
              />
            )}
            <Input
              placeholder={`Short title for your ${selectedType.type}`}
              className={`border-input border-solid ${errors.title && "!border-destructive animate-shake duration-75 [animation-iteration-count:1]"}`}
              value={title}
              onChange={handleTitleChange}
            />
            <Textarea
              className={`border-input border-solid resize-none flex-1 ${errors.description && "!border-destructive animate-shake duration-75 [animation-iteration-count:1]"}`}
              placeholder='Please share the details'
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        ) : !submitted ? (
          <div className='flex flex-col gap-2 p-0 w-full flex-1 items-center justify-center'>
            {Object.entries(feedbackTypes).map(([key, type]) => {
              const IconComponent = type.icon;
              return (
                <Button
                  key={key}
                  size='lg'
                  variant='outline'
                  className={`w-full justify-start h-auto p-4 hover:${type.bgColor} hover:${type.borderColor} transition-all duration-200 group border-input border-solid !bg-card cursor-pointer hover:scale-95`}
                  onClick={() => setSelectedType(type)}
                >
                  <div
                    className={`p-2 rounded-lg ${type.bgColor} ${type.color} mr-3  transition-transform duration-200`}
                  >
                    <IconComponent className='h-4 w-4' />
                  </div>
                  <div className='text-left'>
                    <div className='font-semibold text-sm'>{type.label}</div>
                    <div className='text-xs text-muted-foreground wrap whitespace-normal'>
                      {type.description}
                    </div>
                  </div>
                </Button>
              );
            })}
            <Button
              size='sm'
              variant='outline'
              className='w-full  border-input border-solid'
              onClick={() =>
                window.open(`https://${tenantData.slug}.aura.vote`, "_blank")
              }
            >
              See What Others Are Saying <ExternalLink />
            </Button>
          </div>
        ) : (
          <div className='flex flex-1 items-center justify-center flex-col gap-2'>
            <div className='flex flex-1 items-center justify-center flex-col gap-2'>
              <div className='bg-primary p-2 rounded-4xl flex items-center justify-center'>
                <Check className='w-12 h-12' />
              </div>
              <div className='text-xl font-semibold'>Thank You</div>
              <div className='text-sm text-muted-foreground text-center max-w-[80%]'>
                Your request has been submitted successfully. We'll review it
                and get back to you soon
              </div>
            </div>

            <div className='text-xs text-muted  mt-auto'>
              Redirecting in {counter}.
            </div>
          </div>
        )}

        <DialogFooter className='flex items-center w-full '>
          <div
            onClick={() => window.open("https://aura.vote", "_blank")}
            variant='ghost'
            className='pb-1 flex items-center gap-1 self-end hover:text-foreground/30 text-foreground/50  fill-foreground/50 hover:fill-foreground/30 transition-all duration-100 cursor-pointer'
          >
            <span className='text-[10px] '>Powered By</span>
            <Logo />
            <span className='text-[10px] '>Aura</span>
          </div>

          {selectedType && !submitted && (
            <Button
              size={"sm"}
              onClick={onSubmitHandle}
              className='self-end cursor-pointer'
            >
              Submit {selectedType.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { FeedbackDialog };
