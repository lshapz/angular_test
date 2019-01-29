 declare module 'jscatalyst' {
    import _Vue, {PluginObject, Component} from 'vue'
    const ThemePlugin: PluginObject<void>;
    const D3PieChart: Component;
    export {ThemePlugin, D3PieChart}
  }
