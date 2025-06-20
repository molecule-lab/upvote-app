// src/widget.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import FormWidget from "./FormWidget";
import "./index.css";

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

  return config;
};

const mount = () => {
  // Check if already initialized
  if (isInitialized) {
    console.warn("Widget already initialized");
    return;
  }

  // Check if widget container already exists
  const existingContainer = document.querySelector("upvote-widget-container");
  if (existingContainer) {
    console.warn("Widget container already exists");
    return;
  }

  const container = document.createElement("div");
  container.className = "upvote-widget-container";
  container.id = "aura-widget-root";

  const root = ReactDOM.createRoot(container);
  document.body.appendChild(container);

  const config = getWidgetConfig();

  console.log(config);

  if (config?.theme === "dark") {
    container.classList.add("dark");
  } else {
    container.classList.add("light");
  }

  if (config?.theme === "system") {
    const theme = getSystemTheme();

    container.classList.add(theme);
  }

  if (config.color) {
    container.style.setProperty("--primary", config.color);
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
