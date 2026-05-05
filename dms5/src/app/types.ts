export type AppPage =
  | "logo"
  | "onboarding"
  | "signup"
  | "home"
  | "calendar"
  | "mission"
  | "island-main"
  | "island-decorate"
  | "store"
  | "friends"
  | "customize"
  | "store-closet"
  | "store-appearance"
  | "profile"
  | "settings";

export type MissionCategory = "starter" | "intermediate" | "advanced";

export type DecorateCategory = "house" | "nature";

export type PurchasedDecorItem = {
  id: string;
  name: string;
  category: DecorateCategory;
  image: string;
  price: number;
};

export type IslandDecoration = {
  id: string;
  itemId: string;
  name: string;
  category: DecorateCategory;
  image: string;
  x: number;
  y: number;
};
