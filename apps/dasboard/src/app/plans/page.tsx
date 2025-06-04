"use client";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BillingDetails } from "@/components/dialogs/billing-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const plansData = [
  {
    id: "1",
    dodoPlanName: "Plus",
    features: ["1 Project", "Unlimited Feature Requests", "Single User"],
    price: 7,
    subHeading: "Subheading",
    isPopular: true,
    billingCycle: "Month",
  },
  {
    id: "2",
    dodoPlanName: "Pro",
    features: ["3 Project", "Unlimited Feature Requests", "Multiple User"],
    price: 15,
    subHeading: "Subheading",
    billingCycle: "Month",
    isPopular: false,
  },
];

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

  // useEffect(() => {
  //   if (systemUser?.subscriptions.status === "active") {
  //     router.replace("/");
  //   }
  // }, [systemUser]);

  // if (!systemUser) {
  //   return (
  //     <div className='flex flex-col items-center justify-center gap-2 '>
  //       <Loader2 className='animate-spin' />
  //       <div>Processing Checkout</div>
  //     </div>
  //   );
  // }

  // if (systemUser.subscriptions.status === "active") {
  //   return (
  //     <div className='flex flex-col items-center justify-center gap-2 '>
  //       <Loader2 className='animate-spin' />
  //       <div>Redirecting</div>
  //     </div>
  //   );
  // }

  // if (systemUser.subscriptions.status === "pending") {
  //   return (
  //     <div>
  //       <Alert className='max-w-[600px] ' variant='default'>
  //         <Loader2 className='h-4 w-5 animate-spin' />
  //         <div className='flex flex-col gap-1'>
  //           <AlertTitle>Payment in Progress</AlertTitle>
  //           <AlertDescription>
  //             <div>
  //               You have a payment in progress for the Professional plan.
  //               Complete your payment to activate your subscription.
  //             </div>
  //             <div>
  //               If the payment link is expired, please cancel and try again.
  //             </div>
  //           </AlertDescription>
  //           <div className='flex gap-2 mt-2'>
  //             <Button
  //               onClick={() =>
  //                 window.open(systemUser.subscriptions.paymentUrl, "_blank")
  //               }
  //               className='cursor-pointer'
  //               variant='secondary'
  //               disabled={isCancelLoading}
  //             >
  //               Pay now
  //             </Button>
  //             <Button
  //               onClick={onSubscriptionCancelHandler}
  //               className='cursor-pointer'
  //               variant='outline'
  //               disabled={isCancelLoading}
  //             >
  //               {isCancelLoading ? (
  //                 <Loader2 className='animate-spin' />
  //               ) : (
  //                 "Cancel"
  //               )}
  //             </Button>
  //           </div>
  //         </div>
  //       </Alert>
  //     </div>
  //   );
  // }

  return (
    <div className='flex w-full flex-col '>
      <div className='flex flex-1 items-center justify-center gap-4'>
        <div className='flex flex-1 flex-col md:flex-row items-center justify-center gap-4 max-w-[90%] py-10 '>
          {isBillingDetailsDialogOpen ? (
            <div className='flex flex-col items-center justify-center gap-2'>
              <Loader2 className='animate-spin' />
              <div>Processing Checkout</div>
            </div>
          ) : (
            <div className='flex gap-4 flex-col '>
              {/* {systemUser.subscriptions.status === "failed" && (
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Your last transaction failed</AlertTitle>
                  <AlertDescription>
                    The payment method you provided was declined. Please select
                    a plan below to try again with a different payment method.
                  </AlertDescription>
                </Alert>
              )} */}

              <div className='flex gap-4 flex-col md:flex-row items-center justify-center'>
                {plansData?.map((plan) => (
                  <Card
                    key={plan.id}
                    className='rounded-2xl p-6 shadow-xl gap-4 '
                  >
                    <CardHeader className=' p-0'>
                      <div className='flex items-start justify-start gap-2'>
                        <h2 className='text-2xl font-semibold'>
                          {plan.dodoPlanName}
                        </h2>
                        {plan.isPopular && <Badge>Popular</Badge>}
                      </div>
                      <div className='text-3xl font-bold'>
                        ${plan.price}
                        <span className='text-base font-medium'>/month</span>
                      </div>
                      <p className='text-sm text-zinc-400'>{plan.subHeading}</p>
                    </CardHeader>
                    <div className='flex flex-col text-sm gap-2 '>
                      {plan.features.map((feature, index) => (
                        <div
                          key={`${plan.id}:${index}`}
                          className='flex items-center gap-2'
                        >
                          <Check size={14} /> {feature}
                        </div>
                      ))}
                    </div>
                    <CardFooter className='flex flex-col min-w-[300px]'>
                      <Button
                        className={`w-full cursor-pointer`}
                        variant={plan.isPopular ? "default" : "outline"}
                        onClick={() =>
                          onButtonClickHandler({
                            dodoPlanName: plan.dodoPlanName,
                            dodoPlanId: plan.dodoPlanId,
                            price: plan.price,
                            billingCycle: plan.billingCycle,
                            planId: plan.id,
                          })
                        }
                      >
                        Try {plan.dodoPlanName} for free
                      </Button>

                      <p className='text-xs text-center text-zinc-500 mt-2'>
                        {plan.footerText}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <BillingDetails
        isOpen={isBillingDetailsDialogOpen}
        setIsBillingDetailsDialogOpen={setIsBillingDetailsDialogOpen}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default PlansPage;
