import { auth } from "@/_lib/auth";
export const metadata = {
  title: "Account",
};
export default async function Page() {
  const session = await auth();
  const firstName =
    session?.user?.name?.split(" ")[0] ?? "User";
  return (
    <h1 className=" text-accent-700">
      Hey {firstName}{" "}
    </h1>
  );
}
