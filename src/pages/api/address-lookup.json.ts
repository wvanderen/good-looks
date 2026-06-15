import type { APIRoute } from "astro";

const GEOCODER_ENDPOINT =
  "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";

export const prerender = false;

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

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });

export const GET: APIRoute = async ({ url }) => {
  const address = url.searchParams.get("address")?.trim();

  if (!address) {
    return jsonResponse({ error: "Enter an address to look up." }, 400);
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
      return jsonResponse(
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
      return jsonResponse(
        { error: "We could not find coordinates for that address." },
        404,
      );
    }

    return jsonResponse({
      addressLabel,
      latitude,
      longitude,
    });
  } catch {
    return jsonResponse(
      { error: "Address lookup is unavailable. Try again in a moment." },
      502,
    );
  }
};
