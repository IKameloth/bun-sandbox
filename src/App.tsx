import { Container } from './atoms/container'
import MainContent from './components/main-content'
import { MarkdownView } from './components/markdown-view'
import './App.css'

function App() {
  return (
    <Container>
      <MainContent>
        <MarkdownView />
      </MainContent>
    </Container>
  )
}

export default App
