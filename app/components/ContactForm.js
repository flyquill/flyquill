import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xovkozzg");
  if (state.succeeded) {
    return <p>Thank you for contacting me i will be in touch with you shortly!</p>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow">

        <label className="block text-sm">Email</label>
        <input name='email' id='email' className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Your email" type='text' />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />

        <label className="block text-sm mt-3">Message</label>
        <textarea name='message' id='message' className="mt-1 w-full px-3 py-2 border rounded-md" rows={3} placeholder="Hi Asad, I want to..." />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />

        <button disabled={state.submitting} type="submit" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white">Send Message</button>
      </form>
    </>
  );
}

export default ContactForm;