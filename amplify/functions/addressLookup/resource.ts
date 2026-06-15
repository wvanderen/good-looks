import { defineFunction } from "@aws-amplify/backend";

export const addressLookup = defineFunction({
  name: "address-lookup",
  entry: "./handler.ts",
});
