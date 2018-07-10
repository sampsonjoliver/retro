import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DocumentComponent, { Context } from 'next/Document';
import getPageContext, { PageContext } from './getPageContext';

interface Props {
  pageContext?: PageContext;
}

function withRoot(Component: typeof DocumentComponent | any) {
  class WithRoot extends React.Component<Props> {
    public pageContext: PageContext;

    public static async getInitialProps(ctx: Context) {
      if (Component.getInitialProps) {
        return Component.getInitialProps(ctx);
      }

      return {};
    }

    constructor(props: Props) {
      super(props);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    public componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    public render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  return WithRoot;
}

export { withRoot };
