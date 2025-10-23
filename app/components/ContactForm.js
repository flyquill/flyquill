import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xovkozzg");
  if (state.succeeded) {
    return <p>Thank you for contacting me i will be in touch with you shortly!</p>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="text-sm font-medium text-slate-300">Email</label>
        <input name='email' id='email' className="mt-1 block w-full rounded-lg border-slate-700 bg-slate-800 p-3 text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Your email" type='text' />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />

        <label className="text-sm font-medium text-slate-300">Message</label>
        <textarea name='message' id='message' className="mt-1 block w-full rounded-lg border-slate-700 bg-slate-800 p-3 text-sm focus:border-blue-500 focus:ring-blue-500" rows={3} placeholder="Hi Asad, I want to..." />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <button disabled={state.submitting} type="submit" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition-colors">Send Message</button>
      </form>
    </>
  );
}

export default ContactForm;