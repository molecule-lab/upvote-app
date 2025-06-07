"use client";
import { AlertCircle, Check, Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BillingDetails } from "@/components/dialogs/billing-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const PlansPage = () => {
  // const { systemUser } = useAuth();
  const [isBillingDetailsDialogOpen, setIsBillingDetailsDialogOpen] =
    useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const router = useRouter();

  // const { data: plansData } = useQueryPlans();
  // const { mutateAsync: cancelSubscription } = useMutationCancelSubscription();
  const onButtonClickHandler = (data: any) => {
    setIsBillingDetailsDialogOpen(true);
    setSelectedPlan(data);
  };

  const onSubscriptionCancelHandler = async () => {
    setIsCancelLoading(true);
    // await cancelSubscription({
    //   subscriptionId: systemUser?.subscriptions.id || "",
    // });
    setIsCancelLoading(false);
  };

  return (
    <section id='pricing' className='py-24 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          <div className='bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-left-4 duration-1000'>
            <h3 className='text-2xl font-bold text-foreground mb-2'>Plus</h3>
            <p className='text-muted-foreground mb-6'>
              Perfect for small teams and startups
            </p>
            <div className='text-4xl font-bold text-foreground mb-6'>
              $9<span className='text-lg text-muted-foreground'>/month</span>
            </div>
            <ul className='space-y-3 mb-8'>
              {[
                "1 Project",
                "Unlimited Users",
                "Product Roadmap",
                "Changelog",
                "Email Support",
              ].map((feature, index) => (
                <li key={index} className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              variant='outline'
              className='w-full hover:scale-105 transition-transform duration-200'
            >
              Get Started with Plus
            </Button>
          </div>
          <div className='bg-card border-2 border-primary rounded-lg p-8 relative hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-1000'>
            <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
              <span className='bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg'>
                <Star className='w-4 h-4' />
                Most Popular
              </span>
            </div>
            <h3 className='text-2xl font-bold text-foreground mb-2'>Pro</h3>
            <p className='text-muted-foreground mb-6'>
              For growing businesses and teams
            </p>
            <div className='text-4xl font-bold text-foreground mb-6'>
              $29<span className='text-lg text-muted-foreground'>/month</span>
            </div>
            <ul className='space-y-3 mb-8'>
              {[
                "3 Projects",
                "Unlimited Users",
                "Product Roadmap",
                "Changelog",
                "Priority Support",
              ].map((feature, index) => (
                <li key={index} className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className='w-full hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
              Get Started with Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansPage;
