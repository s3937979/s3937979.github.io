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

export type CharacterItemSource = "closet" | "appearance";

export type CharacterItemSubcategory = "bottoms" | "shoes" | "accessories" | "hair" | "face" | "body";

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

export type PurchasedCharacterItem = {
  id: string;
  name: string;
  source: CharacterItemSource;
  subcategory: CharacterItemSubcategory;
  image: string;
  wornImage: string;
  price: number;
};

export type SavedUser = {
  email: string;
  password: string;
  nickname: string;
};
