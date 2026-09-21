"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // 1. Find all H2 and H3 tags inside the article tag
    const elements = Array.from(document.querySelectorAll("article h2, article h3"));
    
    // 2. Extract their IDs and text
    const headingData = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)), // turns "H2" into 2
    }));
    
    setHeadings(headingData);

    // 3. Set up an observer to highlight the active section as you scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } // Triggers when heading is near the top
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="flex flex-col space-y-3.5 border-l-2 border-gray-100 pl-5">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`text-sm transition-colors hover:text-primary-dark ${
            h.level === 3 ? "ml-4" : "" // Indent H3s automatically
          } ${
            activeId === h.id 
              ? "text-primary-dark font-medium" 
              : "text-gray-500"
          }`}
        >
          {h.text}
        </a>
      ))}
    </aside>
  );
}