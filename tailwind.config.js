/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      width: {
        25: "100px",
        29: "116px",
        63: "252px",
        "n-gap-5-33": "calc(33.333333% - 20px)",
        "n-gap-10-33": "calc(33.333333% - 40px)",
        "n-gap-5-25": "calc(25.000000% - 20px)",
        "n-gap-4-25": "calc(25.000000% - 16px)",
        "n-gap-4-50": "calc(50.000000% - 16px)",
        "n-gap-1_5-50": "calc(50% - 6px)",
        "n-gap-3-50": "calc(50% - 12px)",
        "n-gap-3_5-50": "calc(50% - 14px)",
        "n-gap-5-50": "calc(50% - 20px)",
        "n-gap-5-58": "calc(58% - 20px)",
        "n-gap-5-42": "calc(42% - 20px)",
      },
      height: {
        25: "100px",
        SIDE_NAV: "calc(100% - 80px)",
      },
      screens: {
        navBreak: "920px",
      },
      maxWidth: {
        base: "1120px",
      },
      colors: {
        PRIMARY_RED: "#BC091F",
        PRIMARY_BLUE: "#4f8ff7",
        GREY_TEXT: "#38393E",
        GREYSCALE: "#E5ECF2",
        HERO_DOT: "rgba(188, 9, 31, 0.2)",
        ACCENT_GREEN: "#009B10",
        GREYSCALE_2: "#B4B5BF",
        GREYSCALE_3: "#8C97A1",
        SHADE: "#F5F7FA",
        GREY_2: "#88949E",
      },
      fontSize: {
        title: ["40px", "48px"],
        headerModal: ["44px", "68px"],
        banner: ["56px", "68px"],
        bannerDesc: ["32px", "38px"],
        companyDetailTitle: ["28px", "36px"],
      },
      boxShadow: {
        heroCard: "0px 4px 16px rgba(0, 0, 0, 0.16)",
        bannerIcon: "0px 14px 54px rgba(23, 15, 73, 0.16)",
        serviceStatisticCard: "-4px 4px 24px rgba(0, 0, 0, 0.08)",
        searchFocus: "0px 24px 56px rgba(0, 0, 0, 0.08)",
        bestChoice: "0px 4px 48px rgba(0, 0, 0, 0.12)",
      },
      dropShadow: {
        "3xl": "0px 4px 40px rgba(0, 0, 0, 0.08)",
      },
      padding: {
        13: "52px",
        18: "72px",
      },
      gap: {
        18: "72px",
      },
      backgroundImage: {
        "why-choose-card": "linear-gradient(52.86deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 50%)",
      },
      animation: {
        "ping-slow": "ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
