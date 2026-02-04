import { useEffect } from 'react'

declare global {
  interface Window {
    chatConfig?: {
      chatId: string
      env: string
    }
  }
}

// Utility function to open the chat widget by clicking its button
export function openChatWidget() {
  const openButton = document.querySelector('.open-iframe-btn') as HTMLElement
  
  if (openButton) {
    openButton.click()
  } else {
    setTimeout(() => {
      const retryButton = document.querySelector('.open-iframe-btn') as HTMLElement
      if (retryButton) {
        retryButton.click()
      }
    }, 1000)
  }
}

export function ChatWidget() {
  useEffect(() => {
    // Only load once
    if (document.getElementById('chat-widget-script')) {
      return
    }

    window.chatConfig = {
      chatId: "uc8wKcVpCk",
      env: "skl"
    }

    const script = document.createElement('script')
    script.src = "https://d36ewmyb2wrx29.cloudfront.net/index.js"
    script.async = true
    script.id = 'chat-widget-script'
    document.body.appendChild(script)
  }, [])

  return null
}

