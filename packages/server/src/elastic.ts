const weak = ["CERN-OHL-W-2.0"];

const strong = [
  "CERN-OHL-1.1",
  "CERN-OHL-1.2",
  "CERN-OHL-S-2.0",
  "GPL-1.0-only",
  "GPL-1.0-or-later",
  "GPL-2.0-only",
  "GPL-2.0-or-later",
  "GPL-3.0-only",
  "GPL-3.0-or-later",
];

const non = [
  "Apache-1.0",
  "Apache-1.1",
  "Apache-2.0",
  "MIT",
  "MIT-0",
  "CC-BY-1.0",
  "CC-BY-2.0",
  "CC-BY-2.5",
  "CC-BY-2.5-AU",
  "CC-BY-3.0-AT",
  "CC-BY-3.0-DE",
  "CC-BY-3.0-NL",
  "CC-BY-3.0-US",
  "CC-BY-3.0",
  "CC-BY-4.0",
  "CC-BY-SA-1.0",
  "CC-BY-SA-2.0",
  "CC-BY-SA-2.0-UK",
  "CC-BY-SA-2.1-JP",
  "CC-BY-SA-2.5",
  "CC-BY-SA-3.0",
  "CC-BY-SA-3.0-AT",
  "CC-BY-SA-3.0-DE",
  "CC-BY-SA-4.0",
  "CC0-1.0",
  "CERN-OHL-P-2.0",
];

const LICENSES = {
  weak,
  strong,
  non,
};

export const generateLicenseQuery = (args: any) => {
  if (!args.license) {
    return [];
  }

  const values = LICENSES[args.license as "weak" | "strong" | "non"].map(
    (l) => `P1452=https://spdx.org/licenses/${l}`
  );

  return values.map((v) => ({
    match: {
      statement_keywords: v,
    },
  }));
};
