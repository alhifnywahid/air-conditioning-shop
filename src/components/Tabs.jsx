import { useState } from "react";

export function Tabs({ tabsData, className }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className={`flex gap-2 flex-col ${className}`}>
      <div className="flex gap-1 border-b-2">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-2 box-border border-b-white transition-colors duration-300 p-3 ${
                idx === activeTabIndex
                  ? "relative before:bg-base-100 after:content-[''] before:absolute before:block before:left-0 before:-bottom-1 before:h-[20%] before:w-full rounded-t-md text-blue-500"
                  : "border-transparent hover:text-blue-500"
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="h-full">{tabsData[activeTabIndex].content}</div>
    </div>
  );
}
