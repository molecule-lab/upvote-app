import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import FeedbackContent from "./components/feedback-content";

const queryClient = new QueryClient();

function FormWidget({ config, externalTrigger }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FeedbackContent config={config} externalTrigger={externalTrigger} />
    </QueryClientProvider>
  );
}

export default FormWidget;
