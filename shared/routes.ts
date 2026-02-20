import { z } from "zod";
import { insertInquirySchema, inquiries } from "./schema";

export const api = {
  inquiries: {
    create: {
      method: "POST" as const,
      path: "/api/inquiries" as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
