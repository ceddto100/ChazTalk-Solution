import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Valid email required").max(180),
  company: z.string().max(160).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  intent: z.enum(["demo", "contact", "sales"]).default("contact"),
  source: z.string().max(200).optional(),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
      term: z.string().max(120).optional(),
      content: z.string().max(120).optional(),
    })
    .optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const roiSchema = z.object({
  monthlyCalls: z.number().int().min(0).max(1_000_000),
  avgHandleMin: z.number().min(0).max(120),
  agentHourlyCost: z.number().min(0).max(500),
  automationRate: z.number().min(0).max(1),
  email: z.string().email().optional(),
});

export type RoiPayload = z.infer<typeof roiSchema>;

export const eventSchema = z.object({
  name: z.string().min(1).max(80),
  path: z.string().max(300).optional(),
  sessionId: z.string().max(80).optional(),
  payload: z.record(z.unknown()).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
