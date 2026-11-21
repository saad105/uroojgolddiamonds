import React from 'react';

const SectionHeading = ({ title, subtitle, eyebrow, alignment = 'center', light = false, className = '' }) => {
  const u = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  }[alignment];
  return (
    <div className={`flex flex-col ${u} ${className} mb-10`}>
      {eyebrow && <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C6A15B] mb-2">{eyebrow}</span>}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-wide ${light ? 'text-[#F7F3EA]' : 'text-[#071F1B]'}`}
      >
        {title}
      </h2>
      <div className="flex items-center gap-3 my-3">
        <div className={`h-[1px] w-8 sm:w-12 ${light ? 'bg-[#C6A15B]/40' : 'bg-[#C6A15B]/60'}`} />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#C6A15B]" />
        <div className={`h-[1px] w-8 sm:w-12 ${light ? 'bg-[#C6A15B]/40' : 'bg-[#C6A15B]/60'}`} />
      </div>
      {subtitle && (
        <p
          className={`max-w-2xl text-sm sm:text-base font-light leading-relaxed ${light ? 'text-[#EDE5D7]/80' : 'text-[#171A19]/70'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
