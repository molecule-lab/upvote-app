"use client";
import { Check, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initializePaddle } from "@paddle/paddle-js";
import useAuth from "@/hooks/use-auth";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutationGetPricing } from "@/api/useMutationGetPricing";
import { useRouter } from "next/navigation";

const MONTHLY_PLANS = [
  {
    name: "Starter",
    planId: "starter",
    subHeading: "Perfect for small teams and startups",
    price: 12,
    features: [
      "1 Project",
      "Unlimited Users",
      "Product Roadmap",
      "Changelog",
      "Email Support",
    ],
    buttonText: "Get Started with Started",
    footerNote: "14 Days Free then 12$/month",
    isPopular: false,
  },
  {
    name: "Pro",
    planId: "pro",
    subHeading: "For growing businesses and teams",
    price: 29,
    features: [
      "3 Projects",
      "Unlimited Users",
      "Product Roadmap",
      "Changelog",
      "Priority Support",
      "Early Access to new features",
    ],
    buttonText: "Get Started with Pro",
    footerNote: "14 Days Free then 29$/month",
    isPopular: true,
  },
];

const PlansPage = () => {
  // const { systemUser } = useAuth();
  const [paymentCycle, setPaymentCycle] = useState("yearly");
  const { systemUser, loading: pageLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const { mutateAsync: getPricing } = useMutationGetPricing();
  const router = useRouter();

  // const { data: plansData } = useQueryPlans();
  // const { mutateAsync: cancelSubscription } = useMutationCancelSubscription();

  const onStartNowButtonClick = async (plan) => {
    setLoading(true);
    const priceDetails = await getPricing({
      params: {
        cycle: paymentCycle,
        plan,
      },
    });

    const paddle = await initializePaddle({
      token: "live_c2b549b7a7c71fbcd171893758f",
    });
    paddle?.Environment.set("sandbox");
    paddle?.Checkout.open({
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "en",
        variant: "one-page",
        successUrl: "https://app.aura.vote",
        allowLogout: false,
      },
      items: [{ priceId: priceDetails.id, quantity: 1 }],
      customer: { email: systemUser.email },
    });
    setLoading(false);
  };

  useEffect(() => {
    if (["active", "trialing"].includes(systemUser?.subscription?.status)) {
      router.replace("/");
    }
  }, [systemUser]);

  if (pageLoading) {
    return <Loader2 className='animate-spin' />;
  }

  return (
    <section id='pricing' className='py-8 px-4 sm:px-6 lg:px-8 '>
      <div className='mx-auto '>
        <div className='flex items-center justify-center mb-8 overflow-hidden'>
          <Tabs
            defaultValue={paymentCycle}
            onValueChange={(value) => setPaymentCycle(value)}
          >
            <TabsList className='bg-card'>
              <TabsTrigger
                value='monthly'
                className='data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground'
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value='yearly'
                className='data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground'
              >
                Yearly{" "}
                <Badge variant='secondary' className='bg-background'>
                  2 Months Free
                </Badge>{" "}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex gap-8  mx-auto md:flex-row flex-col-reverse'>
          {MONTHLY_PLANS.map((plan) => {
            return (
              <div
                key={plan.planId}
                className={`flex flex-col bg-card border border-border rounded-lg p-8 hover:shadow-xl gap-6 ${plan.isPopular && "border-2 border-primary relative"}`}
              >
                {plan.isPopular && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg'>
                      <Star className='w-4 h-4' />
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <h3 className='text-2xl font-bold text-foreground mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-muted-foreground '>{plan.subHeading}</p>
                </div>
                <div className='text-2xl font-bold text-foreground '>
                  $
                  {paymentCycle === "yearly"
                    ? ((plan.price * 10) / 12).toFixed(2)
                    : plan.price}
                  <span className='text-sm text-muted-foreground'>
                    /month{" "}
                    <span
                      className={paymentCycle === "monthly" ? "invisible" : ""}
                    >
                      {paymentCycle === "yearly" &&
                        `billed as $${plan.price * 10} yearly`}
                    </span>
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  {paymentCycle === "yearly" && (
                    <div className='flex gap-2 items-center '>
                      <Check className='w-5 h-5 text-primary' />
                      <span className='text-muted-foreground text-primary'>
                        Save ${plan.price * 2}
                      </span>
                    </div>
                  )}
                  {plan.features.map((feature) => {
                    return (
                      <div
                        key={`${plan.planId}_${feature}`}
                        className='flex gap-2 items-center'
                      >
                        <Check className='w-5 h-5 text-primary' />
                        <span className='text-muted-foreground'>
                          {" "}
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Button
                  disabled={loading}
                  onClick={() => onStartNowButtonClick(plan.planId)}
                  variant={plan.isPopular ? "default" : "outline"}
                  className='w-full hover:scale-105 transition-transform duration-200 mt-auto'
                >
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </div>
            );
          })}
          {/* <div className=' flex  flex-col w-[500px] bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-left-4 duration-1000'>
            <h3 className='text-2xl font-bold text-foreground mb-2'>Starter</h3>
            <p className='text-muted-foreground mb-6'>
              Perfect for small teams and startups
            </p>
            <div className='text-4xl font-bold text-foreground mb-6'>
              $12<span className='text-lg text-muted-foreground'>/month</span>
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
              onClick={onStartNowButtonClick}
              variant='outline'
              className='w-full hover:scale-105 transition-transform duration-200 mt-auto'
            >
              Get Started with Starter
            </Button>
          </div>
          <div className=' w-[500px] bg-card border-2 border-primary rounded-lg p-8 relative hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-1000'>
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
                "Early Access to new features",
              ].map((feature, index) => (
                <li key={index} className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className='w-full hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'
              onClick={onStartNowButtonClick}
            >
              Get Started with Pro
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PlansPage;
