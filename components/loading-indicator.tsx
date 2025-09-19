export function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-lg">✨</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            </div>
            <span className="text-sm text-muted-foreground">Jadoo is thinking…</span>
          </div>
        </div>
      </div>
    </div>
  )
}
