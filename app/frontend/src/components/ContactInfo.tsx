import { Mail, Phone, Globe, MapPin } from 'lucide-react'

export function ContactInfo({ contact }: { contact: { phone?: string, email?: string, website?: string, address?: string } }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
      {contact.phone && (
        <div className="flex items-center gap-2 text-slate-700"><Phone className="w-4 h-4" /> <span>{contact.phone}</span></div>
      )}
      {contact.email && (
        <div className="flex items-center gap-2 text-slate-700"><Mail className="w-4 h-4" /> <span>{contact.email}</span></div>
      )}
      {contact.website && (
        <div className="flex items-center gap-2 text-slate-700"><Globe className="w-4 h-4" /> <a href={contact.website} target="_blank" rel="noopener noreferrer" className="underline text-amber-700">{contact.website}</a></div>
      )}
      {contact.address && (
        <div className="flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4" /> <span>{contact.address}</span></div>
      )}
    </div>
  )
}
