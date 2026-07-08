import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../layout/Button'

type FeedbackModalType = 'success' | 'error'

type FeedbackModalProps = {
  isOpen: boolean
  type: FeedbackModalType
  title: string
  message: string
  confirmText: string
  cancelText?: string
  onConfirm: () => void
  onClose: () => void
}

const config: Record<FeedbackModalType, { icon: typeof CheckCircle2; accentClassName: string }> = {
  success: {
    icon: CheckCircle2,
    accentClassName: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  error: {
    icon: XCircle,
    accentClassName: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
  },
}

export function FeedbackModal({ isOpen, type, title, message, confirmText, cancelText, onConfirm, onClose }: FeedbackModalProps) {
  const feedback = config[type]
  const Icon = feedback.icon

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            aria-describedby="feedback-modal-message"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-[#0f1621] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8e2ea] bg-white text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]"
              aria-label="Fechar modal"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${feedback.accentClassName}`}>
                <Icon size={34} />
              </div>

              <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${type === 'success' ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
                {type}
              </p>

              <h2 id="feedback-modal-title" className="mt-3 font-display text-3xl leading-tight text-[var(--brand-ink)] dark:text-slate-100">
                {title}
              </h2>

              <p id="feedback-modal-message" className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)] dark:text-slate-400">
                {message}
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                {cancelText ? (
                  <Button variant="secondary" className="h-11 flex-1 justify-center" onClick={onClose}>
                    {cancelText}
                  </Button>
                ) : null}

                <Button className="h-11 flex-1 justify-center" onClick={onConfirm}>
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
