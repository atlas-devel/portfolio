interface ProjectLoadingNoticeProps { error: string; onClose: () => void }

const ProjectLoadingNotice = ({ error, onClose }: ProjectLoadingNoticeProps) => (
  <div role={error ? "alert" : undefined} className="fixed inset-x-4 top-20 z-[70] mx-auto flex max-w-lg items-center justify-between gap-4 rounded-lg border border-red-500/30 bg-[#101b20] p-5 text-red-200">
    <span>{error || "Loading project..."}</span>
    {error && <button type="button" onClick={onClose} className="rounded border border-white/20 px-3 py-1 text-sm text-white">Close</button>}
  </div>
);

export default ProjectLoadingNotice;
