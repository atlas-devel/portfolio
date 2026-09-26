const HeroBackdrop = () => (
  <>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#02a94c]/5 via-transparent to-cyan-600/5" />
    <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#02a94c]/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl sm:h-96 sm:w-96" />
  </>
);

export default HeroBackdrop;
