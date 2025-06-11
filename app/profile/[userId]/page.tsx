import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import ProfileCard from "@/components/profile/ProfileCard";
import { db } from "@/db";
import { users } from "@/db/schema";

const getUser = async (userId: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        answers: true,
        discussions: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const session = await auth();
  const user = await getUser((await params).userId);
  if (!session) return null;
  return (
    <div className="flex flex-col items-center justify-center md:m-auto my-auto mx-3">
      <ProfileCard session={session} user={user} />
    </div>
  );
}
