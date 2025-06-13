import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { type Theme } from "~/components/theme-provider";
import { CONSTANTS } from "~/lib/constants";

export const getThemeServerFn = createServerFn().handler(() => {
  const theme = getCookie(CONSTANTS.THEME);
  return theme as "system" | "dark" | "light";
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (
      typeof data != "string" ||
      (data != "dark" && data != "light" && data != "system")
    ) {
      throw new Error("Invalid theme provided");
    }
    return data as Theme;
  })
  .handler(async ({ data }) => {
    setCookie(CONSTANTS.THEME, data);
  });
