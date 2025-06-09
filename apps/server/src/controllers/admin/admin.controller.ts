import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { NextFunction, Response } from "express";
import { neonDB } from "src/db/neon-db";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { createError } from "src/middleware/errorHandler";
import { paddle } from "src/utils/paddle";

const getAdminAccount = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const customersData = await paddle.customers
      .list({ email: [user?.email!] })
      .next();

    let subscription;
    if (customersData.length) {
      const customerId = customersData[0].id;
      const subscriptionsList = paddle.subscriptions.list({
        customerId: [customerId],
        status: ["active", "trialing"],
      });

      subscription = await subscriptionsList.next();
    }

    res.status(200).json({
      status: "success",
      message: "User Fetched Successfully",
      data: { user: { ...req.user, subscription: subscription?.[0] } },
    });
  }
);

const createNewTenant = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name, slug } = req.body;

    await neonDB.transaction(async (tx) => {
      const [createdTenant] = await tx
        .insert(tenants)
        .values({
          name,
          slug,
        })
        .returning();

      await tx.insert(userTenantsMapping).values({
        userId: req.user?.id!,
        tenantId: createdTenant.id,
        role: "admin",
      });
    });

    res.status(201).json({
      status: "success",
      message: "New Tenant Created",
      data: {},
    });
  }
);

const getPaymentOptions = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user, query } = req;
    const { plan, cycle } = query;
    try {
      // Get the iterator for products
      const customerList = paddle.customers.list({
        email: [user?.email!],
      });

      const customerData = await customerList.next();
      let subscription: any;
      if (customerData.length) {
        const customerId = customerData[0]?.id;

        const subscriptionsList = paddle.subscriptions.list({
          customerId: [customerId],
          status: ["active"],
        });

        subscription = await subscriptionsList.next();

        if (subscription.length) {
          return next(
            createError("You Already have a active subscription", 403)
          );
        }
      }

      const pricesList = paddle.prices.list();
      const pricesData = await pricesList.next();

      const priceItem: any = pricesData.find(
        (price: any) =>
          price.customData?.cycle === cycle && price.customData?.plan === plan
      );

      res.status(200).json({
        status: "success",
        message: "Payment options fetched successfully",
        data: {
          priceItem,
        },
      });
    } catch (error) {
      console.error("Paddle API Error:", error);
      return next(createError("Failed to fetch payment options", 500));
    }
  }
);

const getCustomerPortalSession = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    const customerList = paddle.customers.list({
      email: [user?.email!],
    });

    const customerData = await customerList.next();

    const customerId = customerData[0]?.id;
    let subscription: any;

    if (customerData.length) {
      const subscriptionsList = paddle.subscriptions.list({
        customerId: [customerId],
        status: ["active"],
      });

      subscription = (await subscriptionsList.next()).map((sub) => sub.id);
    }

    const customerSession = await paddle.customerPortalSessions.create(
      customerId,
      subscription
    );

    res.status(200).json({
      status: "success",
      message: "Session Created Successfully",
      data: { session: customerSession },
    });
  }
);

export {
  getAdminAccount,
  createNewTenant,
  getPaymentOptions,
  getCustomerPortalSession,
};
