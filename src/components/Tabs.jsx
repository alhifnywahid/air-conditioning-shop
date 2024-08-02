import { useState } from "react";

export function Tabs({ tabsData, className }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-1 border-b-2">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`box-border border-2 border-b-white p-3 py-2 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "relative rounded-t-md text-blue-500 before:absolute before:-bottom-1 before:left-0 before:block before:h-[20%] before:w-full before:bg-base-100 after:content-['']"
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
