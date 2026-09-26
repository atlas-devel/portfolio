interface AdminFormActionsProps {
  onCancel: () => void;
  saving: boolean;
  submitLabel: string;
  busyLabel: string;
}

const AdminFormActions = ({ onCancel, saving, submitLabel, busyLabel }: AdminFormActionsProps) => (
  <div className="mt-6 flex justify-between">
    <button type="button" onClick={onCancel} className="rounded-md border border-white/10 bg-gray-600/40 px-6 py-2 text-white transition hover:bg-gray-700">Cancel</button>
    <button type="submit" disabled={saving} className="rounded-md bg-green-600 px-8 py-2 font-semibold text-white transition hover:bg-green-500 disabled:cursor-wait disabled:opacity-60">{saving ? busyLabel : submitLabel}</button>
  </div>
);

export default AdminFormActions;
