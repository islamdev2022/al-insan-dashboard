interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}
