import { describe, it, expect, vi, beforeEach } from "vitest";
import { editProfileAction } from "./EditProfileAction";
import type { Session } from "next-auth";
import type { IEditProfileFormValues } from "./EditProfileForm";

// Mock dependencies
vi.mock("@/db", () => ({
  db: {
    update: vi.fn(() => ({
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue(undefined),
    })),
  },
}));
vi.mock("@/db/schema", () => ({
  users: { id: "id" },
}));
vi.mock("@/auth", () => ({
  unstable_update: vi.fn().mockResolvedValue(undefined),
}));

const validSession: Session = {
  user: { id: "123", name: "oldname", email: "test@example.com", image: "oldimage.jpg", role: "user" , emailVerified: null, bio: "Old bio", createdAt: new Date(),},
  expires: "2099-01-01T00:00:00.000Z",
};

const validData: IEditProfileFormValues = {
  name: "ValidUser_1",
  bio: "This is a valid bio.",
};

describe("editProfileAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error if session is null", async () => {
    const result = await editProfileAction(validData, null);
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/logged in/i);
  });

  it("returns error if data is invalid", async () => {
    // @ts-expect-error
    const result = await editProfileAction(null, validSession);
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/invalid data/i);
  });

  it("returns error if username is invalid", async () => {
    const result = await editProfileAction(
      { ...validData, name: "ab" },
      validSession,
    );
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/username must be between/i);
  });

  it("returns error if bio is too short", async () => {
    const result = await editProfileAction(
      { ...validData, bio: "" },
      validSession,
    );
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/bio must be between/i);
  });

  it("returns error if bio is too long", async () => {
    const longBio = "a".repeat(501);
    const result = await editProfileAction(
      { ...validData, bio: longBio },
      validSession,
    );
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/bio must be between/i);
  });

  it("updates user and returns success for valid input", async () => {
    const result = await editProfileAction(validData, validSession);
    expect(result.status).toBe("Success");
    expect(result.message).toMatch(/profile changed succesfully/i);
    // Check that db.update and unstable_update were called
    const { db } = await import("@/db");
    const { unstable_update } = await import("@/auth");
    expect(db.update).toHaveBeenCalled();
    expect(unstable_update).toHaveBeenCalled();
  });
});