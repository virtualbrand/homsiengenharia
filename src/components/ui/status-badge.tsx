interface StatusBadgeProps {
  status: 'draft' | 'published' | 'all'
  size?: 'sm' | 'md'
}

const statusConfig = {
  draft: {
    label: 'Rascunho',
    textColor: 'text-gray-200',
    borderColor: 'border-gray-200',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  published: {
    label: 'Publicado',
    textColor: 'text-green-300',
    borderColor: 'border-green-300',
    icon: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  all: {
    label: 'Todos',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
      </svg>
    ),
  },
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status]
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-0.5 text-sm'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border backdrop-blur-lg bg-white/10 font-medium ${config.textColor} ${config.borderColor} ${sizeClasses}`}
    >
      {config.icon}
      {config.label}
    </span>
  )
}
