import { useEffect, useState } from "react";

interface DisplayOrderEditorProps {
  displayOrder: number;
  onSave: (displayOrder: number) => Promise<void>;
}

const DisplayOrderEditor = ({
  displayOrder,
  onSave,
}: DisplayOrderEditorProps) => {
  const [order, setOrder] = useState(displayOrder || 1000);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setOrder(displayOrder || 1000), [displayOrder]);

  const save = async () => {
    if (!Number.isSafeInteger(order) || order < 1) {
      setError("Enter a positive whole number.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(order);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Order could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
      <label className="text-xs text-gray-400">Display position</label>
      <input
        type="number"
        min="1"
        value={order}
        onChange={(event) => setOrder(Number(event.target.value))}
        className="w-20 rounded border border-white/10 bg-black/20 px-2 py-1 text-sm text-white"
      />
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded bg-[#02a94c]/20 px-3 py-1 text-xs font-semibold text-[#02a94c] hover:bg-[#02a94c]/35 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save order"}
      </button>
      {error && (
        <span role="alert" className="w-full text-xs text-red-300">
          {error}
        </span>
      )}
    </div>
  );
};

export default DisplayOrderEditor;
