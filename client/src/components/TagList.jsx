import React, { useEffect, useRef, useState } from 'react';

const TagList = ({ tags = [] }) => {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measureTags = () => {
      const children = Array.from(container.children);
      const containerWidth = container.offsetWidth;
      let totalWidth = 0;
      let visible = 0;

      const tagWidths = tags.map((tag) => {
        const temp = document.createElement('div');
        temp.className =
          'border text-[14px] pointer-events-none whitespace-nowrap text-stone-600 uppercase border-stone-500 px-3 py-[2px] transition-colors rounded-full';
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.innerText = tag;
        container.appendChild(temp);
        const width = temp.offsetWidth + 8;
        container.removeChild(temp);
        return width;
      });

      const moreTag = document.createElement('div');
      moreTag.className =
        'border text-[14px] pointer-events-none whitespace-nowrap bg-zinc-300 text-stone-600 uppercase border-stone-500 px-3 py-[2px] transition-colors rounded-full';
      moreTag.style.position = 'absolute';
      moreTag.style.visibility = 'hidden';
      moreTag.innerText = '+99'; // widest case
      container.appendChild(moreTag);
      const moreTagWidth = moreTag.offsetWidth + 8;
      container.removeChild(moreTag);

      for (let i = 0; i < tags.length; i++) {
        const remaining = tags.length - (i + 1);
        const showMore = remaining > 0;
        const neededWidth = totalWidth + tagWidths[i] + (showMore ? moreTagWidth : 0);

        if (neededWidth > containerWidth) break;

        totalWidth += tagWidths[i];
        visible++;
      }

      setVisibleCount(visible);
    };

    measureTags();
    const resizeObserver = new ResizeObserver(measureTags);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [tags]);

  const visibleTags = tags.slice(0, visibleCount);
  const hiddenCount = tags.length - visibleCount;

  return (
    <div ref={containerRef} className='flex flex-nowrap gap-2 overflow-hidden w-full'>
      {visibleTags.map((tag, i) => (
        <div
          key={i}
          className='border text-[14px] pointer-events-none whitespace-nowrap text-zinc-600 uppercase border-zinc-400 px-3 pt-[2px] pb-[8px] transition-colors rounded-lg'
        >
          {tag}
        </div>
      ))}
      {hiddenCount > 0 && (
        <div className='border text-[14px] pointer-events-none whitespace-nowrap bg-zinc-300 text-stone-600 uppercase border-stone-500 px-3 py-[2px] transition-colors rounded-full'>
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default TagList;
