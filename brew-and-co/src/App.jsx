import { formatMessage } from './utils/formatMessage';
import { useState } from 'react'
import axios from 'axios'

const CAFE_SYSTEM_PROMPT = `You are a friendly chatbot assistant for Brew & Co. Cafe.
Here is everything you know about the cafe:

MENU:
- Espresso - $3.00
- Cappuccino - $4.50
- Latte - $4.50
- Americano - $3.50
- Cold Brew - $5.00
- Green Tea - $3.00
- Hot Chocolate - $4.00
- Croissant - $3.50
- Blueberry Muffin - $3.00
- Avocado Toast - $8.00
- Pancakes - $9.00
- Eggs & Toast - $7.50

HOURS:
- Monday to Friday: 7am - 9pm
- Saturday: 8am - 10pm
- Sunday: 9am - 7pm

LOCATION:
- 123 Coffee Lane, Downtown, New York

CONTACT:
- Phone: (555) 123-4567
- Email: hello@brewandco.com

OTHER INFO:
- We accept cash and all major cards
- Free WiFi available
- Vegan and gluten-free options available
- Reservations accepted for groups of 5 or more
- We have indoor and outdoor seating

Always be friendly, warm and helpful. Keep responses short and clear.`

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi there! Welcome to Brew & Co. ☕ How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'anthropic/claude-3-haiku',
          messages: [
            { role: 'system', content: CAFE_SYSTEM_PROMPT },
            ...updatedMessages
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5174',
            'X-Title': 'Brew and Co Cafe'
          }
        }
      )

      const aiMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.log('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I am having trouble connecting. Please try again!'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Header */}
      <div className="bg-amber-800 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold text-center">☕ Brew & Co. Cafe</h1>
        <p className="text-center text-amber-200 text-sm">Ask me anything!</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md text-sm shadow
                ${msg.role === 'user'
                  ? 'bg-amber-700 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
                }`}
            >
              {msg.role === 'user'
                ? msg.content
                : <ul className="list-disc space-y-1">{formatMessage(msg.content)}</ul>
              }
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow text-sm text-gray-500">
              Brewing a response... ☕
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-amber-200 bg-white p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about our menu, hours, location..."
            className="flex-1 border border-amber-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-amber-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-800 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App