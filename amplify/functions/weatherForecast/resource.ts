import { defineFunction } from "@aws-amplify/backend";

export const weatherForecast = defineFunction({
  name: "weather-forecast",
  entry: "./handler.ts",
});
