import { defineBackend } from "@aws-amplify/backend";

import { data } from "./data/resource";
import { addressLookup } from "./functions/addressLookup/resource";
import { weatherForecast } from "./functions/weatherForecast/resource";

defineBackend({
  addressLookup,
  data,
  weatherForecast,
});
