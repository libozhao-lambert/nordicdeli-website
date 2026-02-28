"use client";

import { useState } from "react";
import { clsx } from "clsx";

export interface Tab<T extends string = string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string = string> {
  tabs: Tab<T>[];
  defaultTab?: T;
  onChange?: (tabId: T) => void;
  className?: string;
  children: (activeTab: T) => React.ReactNode;
}

export function Tabs<T extends string = string>({
  tabs,
  defaultTab,
  onChange,
  className,
  children,
}: TabsProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(defaultTab ?? tabs[0]?.id);

  function handleSelect(id: T) {
    setActiveTab(id);
    onChange?.(id);
  }

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-1 border-b border-mist mb-6">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleSelect(tab.id)}
              className={clsx(
                "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-1",
                isActive
                  ? "bg-forest-600 text-white"
                  : "text-charcoal-600 hover:text-charcoal-800 hover:bg-mist"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeTab}
        >
          {tab.id === activeTab && children(activeTab)}
        </div>
      ))}
    </div>
  );
}
