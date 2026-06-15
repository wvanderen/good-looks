import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
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
