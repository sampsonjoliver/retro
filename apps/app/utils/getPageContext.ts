import { SheetsRegistry, GenerateClassName } from 'jss';
import {
  createMuiTheme,
  createGenerateClassName,
  Theme
} from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({});

export interface PageContext {
  theme: Theme;
  sheetsManager: Map<any, any>;
  sheetsRegistry: SheetsRegistry;
  generateClassName: GenerateClassName<any>;
}

function createPageContext(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

export default function getPageContext(): PageContext {
  const pageProcess = process as any;
  const pageGlobal = global as any;

  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!pageProcess.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageGlobal.__INIT_MATERIAL_UI__) {
    pageGlobal.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return pageGlobal.__INIT_MATERIAL_UI__;
}
