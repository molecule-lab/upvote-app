import { DialogDescription } from "@radix-ui/react-dialog";
import { isEmpty } from "lodash";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useMutationCreateSubscription } from "src/api/useMutationCreateSubscription";
import { Button } from "@/components/ui/button";
import { CountrySelector } from "@/components/ui/country-selector";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const KEY_LABEL_MAPPING = {
  street: "Street",
  city: "City",
  state: "State",
  zipcode: "Zipcode",
  country: "Country",
  phoneNumber: "Phone Number",
};

const BillingDetails = ({
  isOpen,
  setIsBillingDetailsDialogOpen,
  selectedPlan,
}: {
  isOpen: boolean;
  setIsBillingDetailsDialogOpen: any;
  selectedPlan: any;
}) => {
  //   const { mutateAsync: createSubscription } = useMutationCreateSubscription();
  const [customer, setCustomer] = useState({
    name: "Rushil",
    email: "mr.rushil17@gmail.com",
  });
  const [billing, setBilling] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
  const router = useRouter();

  const handleInputChange = (section, field, value) => {
    if (section === "customer") {
      setCustomer((prev) => ({ ...prev, [field]: value }));
    } else {
      setBilling((prev) => ({ ...prev, [field]: value }));
    }
  };

  const onContinueToPaymentHandler = async () => {
    setErrors({
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    });

    const emptyFields: any = [];

    Object.keys(billing).forEach((key) => {
      if (isEmpty(billing[key])) {
        emptyFields.push(key);
      }
    });

    Object.keys(customer).forEach((key) => {
      if (isEmpty(customer[key])) {
        emptyFields.push(key);
      }
    });

    const errorState = {};

    emptyFields?.forEach(
      (field) => (errorState[field] = `${KEY_LABEL_MAPPING[field]} is Required`)
    );

    setErrors((current) => ({ ...current, ...errorState }));

    if (emptyFields.length === 0) {
      setIsCheckoutProcessing(true);
      //   const paymentData = await createSubscription({
      //     billing,
      //     customer,
      //     planId: selectedPlan.planId,
      //     dodoPlanId: selectedPlan.dodoPlanId,
      //   });

      //   router.push(paymentData?.paymentUrl || "");
    }
  };

  return (
    <Dialog
      modal={false}
      open={isOpen}
      onOpenChange={() => setIsBillingDetailsDialogOpen(false)}
    >
      {isOpen && <div className='fixed inset-0 bg-black/50 z-40' />}
      <DialogContent className='max-h-[90%] overflow-auto'>
        <DialogHeader className='gap-0.5 flex items-start'>
          <DialogTitle className='text-base font-medium'>Checkout</DialogTitle>
          <DialogDescription className='text-sm text-muted-foreground text-left'>
            We'll use this information to process your order.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4'>
          <div className='rounded-lg border p-3 bg-muted/30 text-sm flex justify-between'>
            <span className='font-medium text-foreground'>
              {selectedPlan.dodoPlanName}
            </span>
            <span className='text-muted-foreground'>
              ${selectedPlan.price}/{selectedPlan.billingCycle}
            </span>
          </div>

          <div className='rounded-lg border p-3 bg-muted/30 text-sm space-y-1.5'>
            {customer.name && (
              <p className='font-medium text-foreground'>{customer.name}</p>
            )}
            <p
              className={`${customer.name ? "text-muted-foreground" : "font-medium text-foreground"}`}
            >
              {customer.email}
            </p>
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='street' className='text-xs text-muted-foreground'>
              Street Address
            </Label>
            <Input
              disabled={isCheckoutProcessing}
              id='street'
              placeholder='123 Main Street'
              value={billing.street}
              onChange={(e) =>
                handleInputChange("billing", "street", e.target.value)
              }
              className='text-sm h-9'
            />
            {errors.street && (
              <div className='text-destructive text-xs'>{errors.street}</div>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='city' className='text-xs text-muted-foreground'>
                City
              </Label>
              <Input
                disabled={isCheckoutProcessing}
                id='city'
                value={billing.city}
                onChange={(e) =>
                  handleInputChange("billing", "city", e.target.value)
                }
                className='text-sm h-9'
              />
              {errors.city && (
                <div className='text-destructive text-xs'>{errors.city}</div>
              )}
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='state' className='text-xs text-muted-foreground'>
                State
              </Label>
              <Input
                disabled={isCheckoutProcessing}
                id='state'
                value={billing.state}
                onChange={(e) =>
                  handleInputChange("billing", "state", e.target.value)
                }
                className='text-sm h-9'
              />
              {errors.state && (
                <div className='text-destructive text-xs'>{errors.state}</div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label
                htmlFor='zipcode'
                className='text-xs text-muted-foreground'
              >
                Zip Code
              </Label>
              <Input
                disabled={isCheckoutProcessing}
                id='zipcode'
                value={billing.zipcode}
                onChange={(e) =>
                  handleInputChange("billing", "zipcode", e.target.value)
                }
                className='text-sm h-9'
              />
              {errors.zipcode && (
                <div className='text-destructive text-xs'>{errors.zipcode}</div>
              )}
            </div>
            <div className='space-y-1.5'>
              <Label
                htmlFor='country'
                className='text-xs text-muted-foreground'
              >
                Country
              </Label>
              <div className='w-full'>
                <CountrySelector
                  onValueChange={(value: any) =>
                    handleInputChange("billing", "country", value)
                  }
                  value={billing.country}
                />
                {errors.country && (
                  <div className='text-destructive text-xs'>
                    {errors.country}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className='w-full'>
          <Button
            disabled={isCheckoutProcessing}
            onClick={onContinueToPaymentHandler}
            className='w-full cursor-pointer'
            variant='secondary'
          >
            {isCheckoutProcessing ? (
              <Loader2 className='animate-spin' />
            ) : (
              "Continue to Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { BillingDetails };
