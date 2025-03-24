import { useState } from "react";

const locales = {
  Arabic: "ar",
  Chinese: "zh",
  English: "en",
  French: "fr",
  German: "de",
  Indonesian: "id",
  Japanese: "ja",
  Portugese: "pt",
  Russian: "ru",
  Spanish: "es",
};
const defaultValue = "en";

export const LocaleDate = () => {
  const [display, setDisplay] = useState(
    toDateStringWithLocale(new Date(), defaultValue),
  );

  return (
    <p>
      <label>
        <select
          onChange={(e) =>
            setDisplay(
              toDateStringWithLocale(new Date(), e.currentTarget.value),
            )
          }
          {...{ defaultValue }}
        >
          {Object.entries(locales).map(([label, value]) => (
            <option {...{ value }} key={value}>
              {label}
            </option>
          ))}
        </select>{" "}
        <span>locale</span>
      </label>{" "}
      displays {display}
    </p>
  );
};

export const ISODate = () => (
  <code className="language-text">{new Date().toISOString()}</code>
);

const toDateStringWithLocale = (date: Date | string | number, locale: string) =>
  new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
