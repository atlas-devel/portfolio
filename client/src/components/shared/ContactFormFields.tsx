const fieldStyle = "w-full rounded-xl border border-white/10 bg-[#001012]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#02a94c]/60 focus:ring-2 focus:ring-[#02a94c]/15";

const ContactFormFields = () => (
  <>
    <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      Website
      <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="space-y-2 text-xs font-medium text-gray-300">
        First name
        <input name="user_name" type="text" placeholder="Your first name" autoComplete="given-name" required className={fieldStyle} />
      </label>
      <label className="space-y-2 text-xs font-medium text-gray-300">
        Last name
        <input name="user_lastname" type="text" placeholder="Your last name" autoComplete="family-name" required className={fieldStyle} />
      </label>
    </div>
    <label className="block space-y-2 text-xs font-medium text-gray-300">
      Email address
      <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required className={fieldStyle} />
    </label>
    <label className="block space-y-2 text-xs font-medium text-gray-300">
      Message
      <textarea name="message" placeholder="A little about your project or idea..." required rows={6} className={`${fieldStyle} resize-y`} />
    </label>
  </>
);

export default ContactFormFields;
