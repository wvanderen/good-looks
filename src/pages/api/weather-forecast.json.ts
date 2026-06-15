import type { APIRoute } from "astro";

const NWS_ENDPOINT = "https://api.weather.gov";
const USER_AGENT =
  "Ride Conditions portfolio app, https://github.com/openai/codex";

export const prerender = false;

type NwsPointsResponse = {
  properties?: {
    forecast?: unknown;
  };
};

type NwsForecastPeriod = {
  name?: unknown;
  startTime?: unknown;
  endTime?: unknown;
  temperature?: unknown;
  temperatureUnit?: unknown;
  windSpeed?: unknown;
  windDirection?: unknown;
  shortForecast?: unknown;
  detailedForecast?: unknown;
  probabilityOfPrecipitation?: {
    value?: unknown;
  };
};

type NwsForecastResponse = {
  properties?: {
    periods?: NwsForecastPeriod[];
  };
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });

const parseCoordinate = (value: string | null, min: number, max: number) => {
  if (!value) {
    return null;
  }

  const coordinate = Number(value);

  if (!Number.isFinite(coordinate) || coordinate < min || coordinate > max) {
    return null;
  }

  return coordinate;
};

const isNwsUrl = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith(`${NWS_ENDPOINT}/`);

const getNearestUsefulPeriod = (periods: NwsForecastPeriod[]) => {
  const now = Date.now();

  return (
    periods.find((period) => {
      if (typeof period.endTime !== "string") {
        return false;
      }

      const endTime = Date.parse(period.endTime);
      return Number.isFinite(endTime) && endTime >= now;
    }) || periods[0]
  );
};

const normalizePeriod = (period: NwsForecastPeriod) => {
  const precipitation = period.probabilityOfPrecipitation?.value;

  return {
    name: typeof period.name === "string" ? period.name : "Current forecast",
    startTime: typeof period.startTime === "string" ? period.startTime : null,
    endTime: typeof period.endTime === "string" ? period.endTime : null,
    temperature:
      typeof period.temperature === "number" ? period.temperature : null,
    temperatureUnit:
      typeof period.temperatureUnit === "string" ? period.temperatureUnit : null,
    windSpeed: typeof period.windSpeed === "string" ? period.windSpeed : null,
    windDirection:
      typeof period.windDirection === "string" ? period.windDirection : null,
    shortForecast:
      typeof period.shortForecast === "string" ? period.shortForecast : null,
    detailedForecast:
      typeof period.detailedForecast === "string"
        ? period.detailedForecast
        : null,
    precipitationChance:
      typeof precipitation === "number" ? precipitation : null,
  };
};

export const GET: APIRoute = async ({ url }) => {
  const latitude = parseCoordinate(url.searchParams.get("latitude"), -90, 90);
  const longitude = parseCoordinate(url.searchParams.get("longitude"), -180, 180);

  if (latitude === null || longitude === null) {
    return jsonResponse(
      { error: "Enter valid latitude and longitude coordinates." },
      400,
    );
  }

  const fetchOptions = {
    headers: {
      accept: "application/geo+json, application/json",
      "user-agent": USER_AGENT,
    },
  };

  try {
    const pointsResponse = await fetch(
      `${NWS_ENDPOINT}/points/${latitude},${longitude}`,
      fetchOptions,
    );

    if (!pointsResponse.ok) {
      return jsonResponse(
        { error: "Weather forecast is unavailable for those coordinates." },
        502,
      );
    }

    const pointsData = (await pointsResponse.json()) as NwsPointsResponse;
    const forecastUrl = pointsData.properties?.forecast;

    if (!isNwsUrl(forecastUrl)) {
      return jsonResponse(
        { error: "Weather forecast is unavailable for those coordinates." },
        502,
      );
    }

    const forecastResponse = await fetch(forecastUrl, fetchOptions);

    if (!forecastResponse.ok) {
      return jsonResponse(
        { error: "Weather forecast is unavailable. Try again in a moment." },
        502,
      );
    }

    const forecastData = (await forecastResponse.json()) as NwsForecastResponse;
    const periods = forecastData.properties?.periods || [];
    const period = getNearestUsefulPeriod(periods);

    if (!period) {
      return jsonResponse(
        { error: "Weather forecast is unavailable for those coordinates." },
        404,
      );
    }

    return jsonResponse({
      forecastUrl,
      period: normalizePeriod(period),
      source: "National Weather Service",
    });
  } catch {
    return jsonResponse(
      { error: "Weather forecast is unavailable. Try again in a moment." },
      502,
    );
  }
};
