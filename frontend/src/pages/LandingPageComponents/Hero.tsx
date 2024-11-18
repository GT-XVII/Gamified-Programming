import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="self-start mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full text-white max-md:max-w-full">
            <h1 className="text-left overflow-hidden flex-1 shrink px-4 pt-3 pb-20 text-7xl tracking-tighter rounded-lg border border-solid bg-white bg-opacity-0 border-zinc-300 border-opacity-0 font-[number:var(--sds-typography-title-page-font-weight)] leading-[80px] min-h-[498px] min-w-[240px] max-md:max-w-full max-md:text-4xl max-md:leading-[53px]">
              Big Bold Title Text That Captures Readers Attention
            </h1>
            <p className=" text-left overflow-hidden flex-1 shrink px-4 pt-3 pb-14 text-xl tracking-tight leading-6 rounded-lg border border-solid bg-white bg-opacity-0 border-zinc-300 border-opacity-0 font-[number:var(--sds-typography-subheading-font-weight)] min-h-[112px] min-w-[240px] max-md:max-w-full">
              Some descriptive text. Think of something cool to write here.
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
          <img 
            loading="lazy" 
            src="/hero1.png" 
            alt="Programming concept illustration"
            className="rounded-3xl" 
          />
        </div>
      </div>
    </section>
  );
};
