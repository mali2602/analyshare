import { AnalysharePage } from './app.po';

describe('analyshare App', () => {
  let page: AnalysharePage;

  beforeEach(() => {
    page = new AnalysharePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
