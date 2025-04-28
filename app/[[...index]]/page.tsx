import { auth } from "@clerk/nextjs/server";
import MainLayout from "../components/MainLayout";

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!session?.userId;

  return <MainLayout isSignedIn={isSignedIn} />;
}
