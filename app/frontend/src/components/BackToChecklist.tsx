import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function BackToChecklist({ categoryId }: { categoryId?: string }) {
  const target = categoryId ? `/resources/${categoryId}` : '/resources'
  return (
    <Link to={target} className="inline-flex items-center gap-2 text-amber-700 hover:underline mb-4" id="back-to-resources-btn">
      <ArrowLeft className="w-4 h-4" /> Back to Resources
    </Link>
  )
}
