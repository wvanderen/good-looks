import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

import { addressLookup } from "../functions/addressLookup/resource";
import { weatherForecast } from "../functions/weatherForecast/resource";

const schema = a.schema({
  lookupAddress: a
    .query()
    .arguments({
      address: a.string().required(),
    })
    .returns(a.string().required())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(addressLookup)),
  lookupWeatherForecast: a
    .query()
    .arguments({
      latitude: a.string().required(),
      longitude: a.string().required(),
    })
    .returns(a.string().required())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(weatherForecast)),
  RideEntry: a
    .model({
      rideDate: a.date().required(),
      addressLabel: a.string().required(),
      latitude: a.float().required(),
      longitude: a.float().required(),
      distanceMiles: a.float().required(),
      durationMinutes: a.integer(),
      effort: a.enum(["easy", "moderate", "hard"]),
      rideNotes: a.string(),
      weatherSummary: a.string(),
      temperature: a.integer(),
      windSpeed: a.string(),
      precipitationSummary: a.string(),
      conditionLabel: a.string(),
      locationSource: a.enum(["address", "manual"]),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
