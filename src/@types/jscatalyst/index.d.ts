declare module 'jscatalyst' {
  import { Component, PluginObject, PluginFunction} from 'vue'
  const D3PieChart: Component
  const ThemePlugin: PluginObject<void>
  export { ThemePlugin }
  export interface ThemePlugin {
    install: PluginFunction<void>
  }
  export { D3PieChart };
}
