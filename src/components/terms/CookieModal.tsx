// src/components/layout/CookieModal.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { CookieConsentState } from "../context/CookieConsentContext";


type Props = {
  currentConsent: CookieConsentState;
  onClose: () => void;
  onSave: (newState: CookieConsentState) => void;
};

// --- Simple Toggle Switch Component ---
function ToggleSwitch({
  label,
  id,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-between cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`block w-10 h-6 rounded-full ${
            checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        ></div>
      </div>
    </label>
  );
}
// --- End Toggle Switch Component ---

export default function CookieModal({ currentConsent, onClose, onSave }: Props) {
  const t = useTranslations("CookieConsent");
  const [localConsent, setLocalConsent] = useState(currentConsent);

  // Sync local state if prop changes
  useEffect(() => {
    setLocalConsent(currentConsent);
  }, [currentConsent]);

  const handleToggle = (key: keyof CookieConsentState, value: boolean) => {
    setLocalConsent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveClick = () => {
    onSave(localConsent);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2
            id="cookie-modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {t("modal.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label={t("modal.close")}
          >
            {/* Close Icon (X) */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="py-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("modal.description")}
          </p>

          {/* Categories */}
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <ToggleSwitch
                id="necessary"
                label={t("modal.necessary.title")}
                checked={true}
                onChange={() => {}}
                disabled={true}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t("modal.necessary.description")}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <ToggleSwitch
                id="analytics"
                label={t("modal.analytics.title")}
                checked={localConsent.analytics}
                onChange={(value) => handleToggle("analytics", value)}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t("modal.analytics.description")}
              </p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <ToggleSwitch
                id="marketing"
                label={t("modal.marketing.title")}
                checked={localConsent.marketing}
                onChange={(value) => handleToggle("marketing", value)}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t("modal.marketing.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSaveClick}
            className="w-full px-4 py-2 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {t("modal.save")}
          </button>
        </div>
      </div>
    </>
  );
}