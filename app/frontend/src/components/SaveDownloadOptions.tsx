import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function printChecklist() {
  window.print()
}

function saveAsPDF() {
  // Use browser print dialog with PDF option for now (cross-browser safe)
  window.print()
}

export function SaveDownloadOptions() {
  const { t } = useTranslation()
  
  return (
          <div className="flex gap-4 flex-wrap mb-4" role="group" aria-label={t('common.saveOrPrintOptions')}>
      <Button id="save-checklist-btn" variant="outline" onClick={saveAsPDF}>
        <Download className="mr-2 w-4 h-4" /> {t('common.downloadNow')}
      </Button>
      <Button id="print-checklist-btn" variant="outline" onClick={printChecklist}>
        <Printer className="mr-2 w-4 h-4" /> Print
      </Button>
    </div>
  )
}
