import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function RedirectScreen() {
  const router = useRouter();
  const { origin } = useLocalSearchParams();

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
    router.replace(origin || "/");
  }, [router, origin]);

  return null;
}
