import { AppVariant } from "@/core/app-variant";

export type AppTabItem = {
  name: "index" | "explore" | "profile";
  href: "/" | "/explore" | "/profile";
  label: string;
  icon: any;
};

/**
 * Profile is a signed-in tab. Hide it until the session exists.
 */
export function getVisibleTabs(
  tabs: readonly AppTabItem[],
  isAuthenticated: boolean,
): AppTabItem[] {
  return tabs.filter((tab) => tab.name !== 'profile' || isAuthenticated);
}

export const appTabConfig: Record<AppVariant, AppTabItem[]> = {
  red: [
    {
      name: "index",
      href: "/",
      label: "Todos",
      icon: require("@/assets/images/tabIcons/home.png"),
    },
    {
      name: "explore",
      href: "/explore",
      label: "Diagnostics",
      icon: require("@/assets/images/tabIcons/explore.png"),
    },
  ],
  blue: [
    {
      name: "index",
      href: "/",
      label: "Home",
      icon: require("@/assets/images/tabIcons/home.png"),
    },
    {
      name: "explore",
      href: "/explore",
      label: "Insights",
      icon: require("@/assets/images/tabIcons/explore.png"),
    },
    {
      name: "profile",
      href: "/profile",
      label: "Profile",
      icon: require("@/assets/images/tabIcons/explore.png"),
    },
  ],
};
