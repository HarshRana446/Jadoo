export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="text-sm text-muted-foreground">Built with Next.js + OpenAI API</div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-medium text-foreground">Created by Harsh Rana</div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/harsh-rana-max/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/HarshRana446"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
