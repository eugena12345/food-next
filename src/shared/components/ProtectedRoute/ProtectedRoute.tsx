'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "~/shared/config/routes.config";
import { useRootStore } from "~/shared/stores/RootStore/RootStoreProvider";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const rootStore =  useRootStore();

  useEffect(() => {
    if (!rootStore.authStore.isAuthenticated) {

      router.push(routes.login.create());
    }
  }, [rootStore.authStore.isAuthenticated]);

  return rootStore.authStore.isAuthenticated ? <>{children}</> : null;

}