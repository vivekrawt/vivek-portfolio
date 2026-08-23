export function ToolChip({ children }: { children: string }) {
  return (
    <li className="rounded-full border border-hairline bg-canvas px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink-muted">
      {children}
    </li>
  )
}

export function ToolChips({ tools, className = '' }: { tools: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tools.map((tool) => (
        <ToolChip key={tool}>{tool}</ToolChip>
      ))}
    </ul>
  )
}
