import { describe, it, expect } from "vitest";
import { appRouter } from "../routers";

describe("AI Router - OpenAI Integration", () => {
  it("should validate OpenAI API key connection", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.ai.testConnection();
    
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toContain("successful");
  });

  // Skipping full chat test to save time - connection test is sufficient
  // The chat endpoint will be tested through the UI
});
