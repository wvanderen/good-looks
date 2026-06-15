import type { Schema } from "../../data/resource";

const GEOCODER_ENDPOINT =
  "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";

type CensusAddressMatch = {
  matchedAddress?: unknown;
  coordinates?: {
    x?: unknown;
    y?: unknown;
  };
};

type CensusResponse = {
  result?: {
    addressMatches?: CensusAddressMatch[];
  };
};

const jsonPayload = (body: unknown, statusCode = 200) =>
  JSON.stringify({ statusCode, body });

export const handler: Schema["lookupAddress"]["functionHandler"] = async (
  event,
) => {
  const address = event.arguments.address?.trim();

  if (!address) {
    return jsonPayload({ error: "Enter an address to look up." }, 400);
  }

  const geocoderUrl = new URL(GEOCODER_ENDPOINT);
  geocoderUrl.searchParams.set("address", address);
  geocoderUrl.searchParams.set("benchmark", "Public_AR_Current");
  geocoderUrl.searchParams.set("format", "json");

  try {
    const response = await fetch(geocoderUrl, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return jsonPayload(
        { error: "Address lookup is unavailable. Try again in a moment." },
        502,
      );
    }

    const data = (await response.json()) as CensusResponse;
    const match = data.result?.addressMatches?.[0];
    const addressLabel = match?.matchedAddress;
    const latitude = match?.coordinates?.y;
    const longitude = match?.coordinates?.x;

    if (
      typeof addressLabel !== "string" ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return jsonPayload(
        { error: "We could not find coordinates for that address." },
        404,
      );
    }

    return jsonPayload({
      addressLabel,
      latitude,
      longitude,
    });
  } catch {
    return jsonPayload(
      { error: "Address lookup is unavailable. Try again in a moment." },
      502,
    );
  }
};
