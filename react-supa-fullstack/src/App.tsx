import { Button, Input  } from "antd";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <div className="p-5 font-bold flex flex-col gap-5 w-max">
        <h1>App Component In Homepage</h1>
        <Button>AntD Default Button</Button>
        <Button type="primary">AntD Primary Button</Button>
        <Input placeholder="Antd Input"/>
      </div>
    </ThemeProvider>

  )
}

export default App;