import { auth } from "@/auth";
import ProfileCard from "@/components/ProfileCard";
import { getCurrentUrl } from "@/utils/getCurrentUrl";

const getUser = async (userId: string) => {
  try {
    const response = await fetch(
      getCurrentUrl() + `/externalApi/user/${userId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_KEY_TOKEN!,
        },
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await auth();
  const user = await getUser(params.userId);
  if (!session) return null;
  return (
    <div className="flex flex-col items-center justify-center md:m-auto my-auto mx-3">
      <ProfileCard session={session} user={user} />
    </div>
  );
}
