// src/widget.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import FormWidget from "./FormWidget";
import cssContent from "./index.css?inline";

// Prevent multiple initializations
let isInitialized = false;

console.log("Calling Widget Script");
const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const hasCustomTrigger = () => {
  return !!document.querySelector("[data-aura-widget], #aura-widget-button");
};
const getWidgetConfig = () => {
  // Find the script tag that loaded this widget
  const scripts = document.querySelectorAll('script[src*="widget"]');
  const widgetScript = scripts[scripts.length - 1]; // Get the last matching script

  if (!widgetScript) {
    return {}; // Return default empty config if script not found
  }

  // Extract data attributes from script tag
  const config = {};
  Array.from(widgetScript.attributes).forEach((attr) => {
    if (attr.name.startsWith("data-")) {
      const key = attr.name
        .replace("data-", "")
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      config[key] = attr.value;
    }
  });

  // Extract query parameters from src attribute
  const srcUrl = widgetScript.getAttribute("src");
  if (srcUrl && srcUrl.includes("?")) {
    try {
      const url = new URL(srcUrl);
      const searchParams = url.searchParams;

      // Add query parameters to config (query params take precedence over data attributes)
      searchParams.forEach((value, key) => {
        const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        config[camelCaseKey] = value;
      });
    } catch (error) {
      console.warn("Failed to parse widget script src URL:", error);
    }
  }

  // Convert string booleans to actual booleans
  if (config.collectEmail) {
    config.collectEmail = config.collectEmail === "true";
  }

  return config;
};

export const reactContainer = document.createElement("div");

const mount = () => {
  // Check if already initialized

  if (isInitialized) {
    console.warn("Widget already initialized");
    return;
  }

  // Check if widget container already exists
  const existingContainer = document.querySelector("aura-widget-container");
  if (existingContainer) {
    console.warn("Widget container already exists");
    return;
  }

  const container = document.createElement("div");
  container.className = "aura-widget-wrapper";
  container.id = "aura-widget-root";

  // Create shadow DOM for complete isolation
  const shadowRoot = container.attachShadow({ mode: "open" });

  // Inject CSS into shadow DOM
  const style = document.createElement("style");
  style.textContent = cssContent;
  shadowRoot.appendChild(style);

  // Const Dialog Container

  // Create the React root container inside shadow DOM

  reactContainer.className = "aura-widget-container";
  reactContainer.id = "aura-widget-container-root";
  shadowRoot.appendChild(reactContainer);

  const root = ReactDOM.createRoot(reactContainer);
  document.body.appendChild(container);

  const config = getWidgetConfig();

  if (config?.theme === "dark") {
    reactContainer.classList.add("dark");
  } else {
    reactContainer.classList.add("light");
  }

  if (config?.theme === "system") {
    const theme = getSystemTheme();

    reactContainer.classList.add(theme);
  }

  if (config.color) {
    reactContainer.style.setProperty("--primary", config.color);
  }

  root.render(
    <FormWidget config={config} externalTrigger={hasCustomTrigger()} />
  );

  // Mark as initialized
  isInitialized = true;
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
