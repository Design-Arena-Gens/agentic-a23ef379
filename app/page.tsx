'use client'

import { useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const slidesRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      title: "How Learning English Literature Improves Our Life",
      subtitle: "Discovering the Transformative Power of Words",
      content: "English literature isn't just about reading old books or analyzing poems. It's a journey into the human experience that shapes who we are and how we see the world around us.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "📚"
    },
    {
      title: "Expanding Our Emotional Intelligence",
      subtitle: "Understanding Hearts and Minds",
      content: "Through the characters we meet in literature—from Shakespeare's complex protagonists to modern heroes—we learn to understand emotions we might never experience ourselves. We walk in someone else's shoes, feel their joys and sorrows, and develop deeper empathy. This emotional awareness doesn't stay on the page; it follows us into our relationships, making us better friends, partners, and colleagues.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "❤️"
    },
    {
      title: "Sharpening Critical Thinking Skills",
      subtitle: "Learning to Question and Analyze",
      content: "Literature teaches us to read between the lines, to question motives, and to see multiple perspectives. When we analyze symbolism in 'The Great Gatsby' or debate the themes in '1984', we're training our minds to think critically about everything—from news articles to social media posts. In today's world of information overload, this skill is more valuable than ever.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "🧠"
    },
    {
      title: "Improving Communication and Expression",
      subtitle: "Finding Our Voice",
      content: "Reading great writers shows us the power of well-chosen words. We learn how to express complex ideas clearly, how to persuade, how to tell our own stories. Whether we're writing an email, giving a presentation, or just having a conversation, the vocabulary and communication skills we gain from literature help us connect with others more effectively and express ourselves with confidence.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "💬"
    },
    {
      title: "Building Cultural Awareness and Connection",
      subtitle: "Bridging Worlds Through Stories",
      content: "English literature opens windows to different cultures, time periods, and ways of life. From Jane Austen's England to Chinua Achebe's Nigeria, from ancient mythology to contemporary voices, we gain a richer understanding of our diverse world. This cultural literacy helps us navigate our globalized society with respect and curiosity, connecting us to the broader human family across time and space.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: "🌍"
    }
  ]

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const slideElements = slidesRef.current?.querySelectorAll('.slide')

      if (slideElements) {
        for (let i = 0; i < slideElements.length; i++) {
          const slide = slideElements[i] as HTMLElement
          const canvas = await html2canvas(slide, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: null
          })

          const imgData = canvas.toDataURL('image/png')
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = pdf.internal.pageSize.getHeight()

          if (i > 0) pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        }
      }

      pdf.save('english-literature-improves-life.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  padding: '0.5rem 1rem',
                  background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.2)',
                  color: currentSlide === index ? '#667eea' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: currentSlide === index ? 'bold' : 'normal',
                  transition: 'all 0.3s ease'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              opacity: isGenerating ? 0.6 : 1
            }}
          >
            {isGenerating ? 'Generating PDF...' : '📄 Download PDF'}
          </button>
        </div>

        {/* Current Slide Display */}
        <div style={{
          background: slides[currentSlide].gradient,
          borderRadius: '20px',
          padding: '4rem',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {slides[currentSlide].icon}
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            {slides[currentSlide].title}
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            {slides[currentSlide].subtitle}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            maxWidth: '900px',
            opacity: 0.95
          }}>
            {slides[currentSlide].content}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            style={{
              padding: '0.75rem 1.5rem',
              background: currentSlide === 0 ? 'rgba(255, 255, 255, 0.2)' : 'white',
              color: currentSlide === 0 ? 'rgba(255, 255, 255, 0.5)' : '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            style={{
              padding: '0.75rem 1.5rem',
              background: currentSlide === slides.length - 1 ? 'rgba(255, 255, 255, 0.2)' : 'white',
              color: currentSlide === slides.length - 1 ? 'rgba(255, 255, 255, 0.5)' : '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            Next →
          </button>
        </div>

        {/* Hidden slides for PDF generation */}
        <div ref={slidesRef} style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slide"
              style={{
                width: '297mm',
                height: '210mm',
                background: slide.gradient,
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
                {slide.icon}
              </div>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                {slide.title}
              </h1>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '300',
                marginBottom: '2.5rem',
                opacity: 0.9
              }}>
                {slide.subtitle}
              </h2>
              <p style={{
                fontSize: '1.5rem',
                lineHeight: '1.8',
                maxWidth: '85%',
                opacity: 0.95
              }}>
                {slide.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
