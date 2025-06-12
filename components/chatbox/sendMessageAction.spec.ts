import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessage } from "./sendMessageAction";
import { db } from "@/db";
import { Session } from "next-auth";

// Mock db.insert
vi.mock("@/db", () => ({
  db: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue(undefined),
  },
}));

describe("sendMessage", () => {
  let session: Session;

  beforeEach(() => {
    session = {
  user: { id: "123", name: "oldname", email: "test@example.com", image: "oldimage.jpg", role: "user" , emailVerified: null, bio: "Old bio", createdAt: new Date(),},
  expires: "2099-01-01T00:00:00.000Z",
};
    vi.clearAllMocks();
  });

  it("returns error if session is null", async () => {
    const data = new FormData();
    data.set("message", "Hello");
    const result = await sendMessage(data, null);
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/logged in/i);
  });

  it("returns error if message is missing", async () => {
    const data = new FormData();
    const result = await sendMessage(data, session);
    expect(result.status).toBe("Error");
    expect(result.message).toMatch(/required/i);
  });

  it("returns error if message is not a string", async () => {
    const data = new FormData();
    // @ts-expect-error: Simulate non-string value
    data.set("message", 123);
    const result = await sendMessage(data, session);
    expect(result.status).toBe("Error");
    expect(result.message).toMatch(/invalid/i);
  });

  it("returns error if message is invalid", async () => {
    const data = new FormData();
    data.set("message", "💩".repeat(6000)); // Too long
    const result = await sendMessage(data, session);
    expect(result.status).toBe("Error");
    expect(result.message).toMatch(/invalid/i);
  });

  it("inserts message and returns success for valid input", async () => {
    const data = new FormData();
    data.set("message", "Hello world! ♿🔥");
    const result = await sendMessage(data, session);
console.log(result)
    expect(result.status).toBe("Success");
    expect(result.message).toMatch(/Message sent/i);
  });
});