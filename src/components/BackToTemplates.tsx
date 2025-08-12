import Link from 'next/link';

export default function BackToTemplates() {
  return (
    <div className="fixed top-4 left-4 z-50 print:hidden">
      <Link
        href="/templates"
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium backdrop-blur transition
                   bg-white/70 text-gray-900 hover:bg-white/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        aria-label="Voltar para a lista de templates"
      >
        <span aria-hidden>←</span>
        <span>Templates</span>
      </Link>
    </div>
  );
}
