import { useState } from 'react'
import { personalInfo, projects, skills } from '../data/portfolioData'

const systemPrompt = `You are a helpful assistant on ${personalInfo.name}'s portfolio website. 
Answer questions about ${personalInfo.name} based on this information:
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Tagline: ${personalInfo.tagline}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
Projects: ${projects.map(p => `${p.title} - ${p.description} (Tech: ${p.tech.join(', ')})`).join('. ')}
Skills: ${skills.join(', ')}
Keep answers short, friendly and professional.`

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm ${personalInfo.name}'s AI assistant. Ask me anything about his work and experience!` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: systemPrompt, messages: newMessages }),
      })
      const data = await response.json()
      const reply = data.content[0].text
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again!' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          <div className="bg-gray-900 px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-white text-sm font-medium">Chat with AI</p>
              <p className="text-gray-400 text-xs">Ask me about {personalInfo.name}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors text-lg">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-xl text-sm text-gray-500">Thinking...</div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask something..." className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-400"/>
            <button onClick={sendMessage} disabled={loading} className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">→</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center text-xl">
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  )
}