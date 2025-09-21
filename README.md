# Jadoo AI Assistant 🤖

A modern, intelligent AI assistant built with Next.js and OpenAI, featuring voice interaction, multiple personality modes, and a beautiful dark/light theme interface.

## 🌐 Live Demo

**[Visit Jadoo AI Assistant](https://jadooai.vercel.app/)**

## ✨ Features

- **AI-Powered Conversations**: Intelligent responses powered by OpenAI's GPT models
- **Voice Interaction**: 
  - Speech-to-text input
  - Text-to-speech responses
  - Customizable voice settings
- **Multiple Personality Modes**:
  - Professional Assistant
  - Creative Companion  
  - Technical Expert
  - Casual Friend
- **Modern UI/UX**:
  - Dark/Light theme toggle
  - Responsive design
  - Smooth animations
  - Clean, intuitive interface
- **Markdown Support**: Rich text formatting in chat responses
- **Settings Panel**: Customize voice, personality, and preferences
- **Demo Mode**: Fallback responses when API quota is exceeded

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- OpenAI API key

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd jadoo-ai-assistant
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   bun install
   # or
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Add your OpenAI API key to the `.env` file:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   bun dev
   # or
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) + OpenAI
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Typography**: [Geist Font](https://vercel.com/font)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **Deployment**: [Vercel](https://vercel.com/)

## 📱 Usage

1. **Start Chatting**: Type your message or use the microphone button for voice input
2. **Customize Settings**: Click the settings icon to:
   - Choose your preferred AI personality mode
   - Adjust voice settings (rate, pitch, volume)
   - Toggle voice features on/off
3. **Switch Themes**: Use the theme toggle in the navigation bar
4. **Voice Features**: 
   - Click the microphone to speak your message
   - Enable auto-speech to hear AI responses aloud

## 🎨 Personality Modes

- **Professional Assistant**: Formal, business-focused responses
- **Creative Companion**: Imaginative, artistic, and inspiring
- **Technical Expert**: Detailed, technical explanations
- **Casual Friend**: Relaxed, conversational tone

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

### Voice Settings

The app supports customizable voice synthesis with adjustable:
- Speech rate (0.5x - 2x speed)
- Pitch (0.5x - 2x)
- Volume (0% - 100%)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Creator

**Harsh Rana**
- Email: [ranaharsh669@gmail.com](mailto:ranaharsh669@gmail.com)
- LinkedIn: [harsh-rana-max](https://www.linkedin.com/in/harsh-rana-max/)
- GitHub: [HarshRana446](https://github.com/HarshRana446)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ by [Harsh Rana](https://github.com/HarshRana446)
