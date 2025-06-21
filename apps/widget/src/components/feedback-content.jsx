import { Button } from "./ui/button";

import { useState } from "react";

import { useEffect } from "react";
import { FeedbackDialog } from "./dialog/feedback-dialog/feedback";
import validator from "validator";
import { useMutationCreateRequest } from "@/api/useMutationCreateRequest";
import { BadgeAlert } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { CircleEllipsis } from "lucide-react";

const descriptionBuilder = (description) => {
  return JSON.stringify({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: description,
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
          textFormat: 0,
          textStyle: "",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });
};

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

function FeedbackContent({ config, externalTrigger = false }) {
  const { color, position } = config;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [timeout, setTimeout] = useState(null);
  const [counter, setCounter] = useState(5);

  const [errors, setErrors] = useState({
    title: null,
    email: null,
    description: null,
  });

  const { mutateAsync: createRequest } = useMutationCreateRequest();

  const onBackButtonClick = () => {
    setSelectedType(null);
    setErrors({ title: null, email: null, description: null });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onSubmitHandle = async () => {
    let isError = false;
    if (config.collectEmail && !Boolean(email)) {
      isError = true;
      setErrors((current) => ({ ...current, email: true }));
    }

    if (config.collectEmail && !validator.isEmail(email)) {
      isError = true;
      setErrors((current) => ({ ...current, email: true }));
    }

    if (!Boolean(title)) {
      isError = true;
      setErrors((current) => ({ ...current, title: true }));
    }

    if (!Boolean(description)) {
      isError = true;
      setErrors((current) => ({ ...current, description: true }));
    }

    if (isError) {
      return;
    }

    await createRequest({
      data: {
        tenantId: config.tenantId,
        email: email,
        title: title,
        description: descriptionBuilder(description),
        selectedType: selectedType.type,
      },
    });

    console.log({ title, email, description: descriptionBuilder(description) });

    setSubmitted(true);
    const timeout = setInterval(() => {
      setCounter((current) => current - 1);
    }, 1000);

    setTimeout(timeout);
  };

  const clearData = () => {
    clearTimeout(timeout);
    setTitle("");
    setEmail("");
    setDescription("");
    setTimeout(null);
    setCounter(5);
    setSubmitted(false);
    setIsPopupOpen(false);
    setErrors({ email: null, description: null, title: null });

    if (config.defaultType) {
      const foundRequestTye = feedbackTypes[config.defaultType];

      setSelectedType(foundRequestTye || "");
    } else {
      setSelectedType("");
    }
  };

  useEffect(() => {
    if (!externalTrigger) return;

    const trigger = document.querySelector(
      "[data-aura-widget], #aura-widget-button"
    );

    if (trigger) {
      trigger.addEventListener("click", () => setIsPopupOpen(true));
    }

    return () => {
      if (trigger)
        trigger.removeEventListener("click", () => setIsPopupOpen(true));
    };
  }, [externalTrigger]);

  useEffect(() => {
    if (counter === 0) {
      clearData();
    }
  }, [counter]);

  useEffect(() => {
    console.log(config);
    if (config.defaultType) {
      const foundRequestTye = feedbackTypes[config.defaultType];

      setSelectedType(foundRequestTye);
    }

    if (config.defaultOpen === "true") {
      setIsPopupOpen(true);
    }

    () => {
      clearData();
    };
  }, []);

  return (
    <>
      {!externalTrigger && (
        <div
          className={`fixed z-50  ${position === "left" ? "left-3" : "right-3"}  bottom-48  `}
        >
          <Button
            onClick={() => setIsPopupOpen(true)}
            className={`rotate-270 z-50 ${position === "left" ? "origin-left" : "origin-right"}`}
            style={{ ...(color && { background: color }) }}
          >
            {config.ctaText ? config.ctaText : "Feedback"}
          </Button>
        </div>
      )}
      <FeedbackDialog
        clearData={clearData}
        isPopupOpen={isPopupOpen}
        onBackButtonClick={onBackButtonClick}
        selectedType={selectedType}
        submitted={submitted}
        setSelectedType={setSelectedType}
        config={config}
        errors={errors}
        title={title}
        email={email}
        description={description}
        handleTitleChange={handleTitleChange}
        handleEmailChange={handleEmailChange}
        handleDescriptionChange={handleDescriptionChange}
        onSubmitHandle={onSubmitHandle}
        counter={counter}
      />
    </>
  );
}

export default FeedbackContent;
